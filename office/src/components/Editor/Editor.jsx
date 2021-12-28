import React, { useState, useEffect, useCallback, useReducer } from "react";
import "./css/index.css";
import EdiHeader from "./components/EdiHeader";
import Screen from "./components/Screen";
import Popup from "./components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { Beforeunload } from "react-beforeunload";
import { useHistory } from "react-router-dom";
import firebaseApp from "../config/firebaseApp";
import TitleSection from "./components/TitleSection";
import { Animation } from "../styles/Animation";
import Loading from "./components/Loading";
const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();

function Editor({ location }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { type, timestamp, category, id } = location.state;
  const temKey = useSelector((state) => state.database.key);
  const deletelist = useSelector((state) => state.database.deletelist);
  const template = useSelector((state) => state.database.editor);
  function reducer(state, action) {
    switch (action.type) {
      case "RESET":
        return {
          title: undefined,
          isPin: false,
          isBlind: false,
        };
      case "INIT":
        return action.info;
      case "TITLE":
        return { ...state, title: action.title };
      case "PIN":
        return { ...state, isPin: action.isPin };
      case "BLIND":
        return { ...state, isBlind: action.isBlind };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  const [info, patch] = useReducer(reducer, {
    title: undefined,
    isPin: false,
  });
  const [isUp, setIsUp] = useState({
    status: false,
    type: "",
  });
  const __removeUrl = useCallback((template, urlList) => {
    return new Promise((resolve, reject) => {
      if (urlList.length > 0) {
        const clone = urlList.slice();
        template.forEach(({ content: { url }, type }) => {
          if (type === "IMAGE" || type === "FILE") {
            for (let i = 0; i < clone.length; i++) {
              const element = clone[i];
              if (element.content.url === url) {
                clone.splice(i, i + 1);
              }
            }
          }
        });
        resolve(clone);
      } else {
        resolve(undefined);
      }
    });
  }, []);

  const __insetData = useCallback(() => {
    const { title, isPin, isBlind } = info;
    if (type !== "new") {
      const res = Fstore.collection(category).doc(temKey);
      if (deletelist.length > 0) {
        __removeUrl(template, deletelist).then((urlList) => {
          res
            .update({
              urlList,
              template: template,
              title: title,
              config: {
                isPin,
                isBlind,
              },
            })
            .then(() => {
              history.goBack();
            });
        });
      } else {
        res
          .update({
            template: template,
            title: title,
            config: {
              isPin,
              isBlind,
            },
          })
          .then(() => {
            history.goBack();
          });
      }
    } else {
      Fstore.collection(category)
        .doc(temKey)
        .update({
          template: template,
          title: title,
          config: {
            isBlind: false,
            isPin,
          },
        })
        .then(() => {
          history.goBack();
        });
    }
  }, [
    template,
    category,
    temKey,
    info,
    history,
    type,
    __removeUrl,
    deletelist,
  ]);

  useEffect(() => {
    if (type === "new") {
      Fstore.collection(category)
        .add({
          title: "임시저장",
          timestamp: timestamp,
          config: {
            isBlind: true,
            isPin: false,
          },
        })
        .then((res) => {
          patch({
            type: "RESET",
          });
          dispatch({
            type: "@layouts/INIT_KEY",
            payload: res.id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Fstore.collection(category)
        .doc(id)
        .get()
        .then((result) => {
          const value = result.data();
          patch({
            type: "INIT",
            info: {
              title: value.title,
              isPin: value.config.isPin,
              isBlind: value.config.isBlind,
            },
          });
          if (value.urlList) {
            dispatch({
              type: "@layouts/INIT_DELETELIST",
              payload: value.urlList,
            });
          } else {
            dispatch({
              type: "@layouts/INIT_DELETELIST",
              payload: [],
            });
          }
          if (value.videoList) {
            dispatch({
              type: "@layouts/INIT_VIDEO",
              payload: value.videoList,
            });
          } else {
            dispatch({
              type: "@layouts/INIT_VIDEO",
              payload: [],
            });
          }

          dispatch({
            type: "@layouts/CHANGE_EDITOR",
            payload: value.template
              ? value.template
              : [
                  {
                    type: "TITLE",
                    content: "",
                    id: `title-${
                      new Date().getTime() -
                      Math.floor(Math.random() * (100 - 1 + 1)) +
                      1
                    }`,
                  },
                ],
          });
        });
      dispatch({
        type: "@layouts/INIT_KEY",
        payload: id,
      });
    }
    return () => {};
  }, [dispatch, category, id, type, timestamp]);
  useEffect(() => {
    return () => {
      dispatch({
        type: "@layouts/RESET",
      });
    };
  }, [dispatch]);
  return (
    <Beforeunload
      onBeforeunload={(e) => {
        e.preventDefault();
      }}
    >
      <Animation>
        <div className="editor">
          <TitleSection dispatch={patch} info={info} insert={__insetData} />
          <div className="editor-wrapper">
            <EdiHeader
              setIsUp={setIsUp}
              temKey={temKey}
              category={category}
              type={type}
            />
            <Screen
              temKey={temKey}
              Fstore={Fstore}
              Fstorage={Fstorage}
              state={type}
            />
          </div>
          <Popup
            isUp={isUp}
            setIsUp={setIsUp}
            temKey={temKey}
            category={category}
            state={type}
          />
        </div>
      </Animation>
      <Loading />
    </Beforeunload>
  );
}

export default Editor;
