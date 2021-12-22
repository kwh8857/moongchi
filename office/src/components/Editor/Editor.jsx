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
  const template = useSelector((state) => state.database.editor);

  function reducer(state, action) {
    switch (action.type) {
      case "RESET":
        return {
          title: undefined,
          sub: false,
        };
      case "INIT":
        return action.info;
      case "TITLE":
        return { ...state, title: action.title };
      case "PIN":
        return { ...state, isPin: action.pin };
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
        template.forEach(({ content: { resize, url }, type }) => {
          if (type === "IMAGE" || type === "FILE") {
            for (let i = 0; i < clone.length; i++) {
              const element = clone[i];
              if (
                element.content.resize === resize &&
                element.content.url === url
              ) {
                clone.splice(i, i + 1);
              } else if (element.content.url === url) {
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
    const { title, isPin } = info;
    if (type !== "new") {
      Fstore.collection(category)
        .doc(temKey)
        .get()
        .then((res) => {
          const value = res.data();
          if (value.urlList) {
            __removeUrl(template, value.urlList).then((urlList) => {
              res.ref
                .update({
                  urlList,
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
            });
          } else {
            res.ref
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
        })
        .then(() => {
          history.goBack();
        });
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
  }, [template, category, temKey, info, history, type, __removeUrl]);

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
            },
          });
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
            <Screen temKey={temKey} Fstore={Fstore} Fstorage={Fstorage} />
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
