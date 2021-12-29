import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import firebaseApp from "../config/firebaseApp";
import Preview from "./components/Preview";
import { Animation } from "../styles/Animation";
import { v4 as uuidv4 } from "uuid";
import Box from "./components/Box";

const Fstore = firebaseApp.firestore();

const Wrapper = styled.main`
  min-height: 100%;
  height: fit-content;
  background-color: #f8f8f8;
  & > .container {
    padding: 117px 0;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > .ani {
      width: 100%;
      & > .top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .title {
          font-size: 30px;
          font-weight: bold;
        }
        & > .btn-wrapper {
          transform: translateY(10px);
          display: grid;
          grid-template-columns: repeat(3, 153px);
          column-gap: 17px;
          & > .preview {
            color: #434343;
          }
          & > .save {
            background-color: #007fff;
          }
          & > .insert {
            background-color: white;
            color: black;
            & > figure {
              height: 20px;
              margin-right: 5px;
            }
          }
          & > button {
            height: 44px;
            width: 100%;
            border-radius: 6px;
            background-color: #dbdbdb;
            font-size: 16px;
            font-weight: bold;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

function PopupManager() {
  const dispatch = useDispatch();
  const [isPopup, setIsPopup] = useState(false);
  const [List, setList] = useState([]);
  const __save = useCallback(() => {
    Fstore.collection("config")
      .doc("popup")
      .set({
        list: List,
      })
      .then(() => {
        dispatch({
          type: "@config/TOAST",
          payload: {
            isactive: true,
            msg: "팝업을 저장하였습니다",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [List, dispatch]);
  const __update = useCallback(
    (val, type, idx) => {
      let arr = List.slice();
      if (type === "title") {
        arr[idx].title = val;
      }
      if (type === "time") {
        arr[idx].time = val;
      }
      if (type === "link") {
        arr[idx].link = val;
      }
      if (type === "content") {
        arr[idx].content = val;
      }
      setList(arr);
    },
    [List]
  );
  const __addCard = useCallback(() => {
    let arr = List.slice();
    arr.unshift({
      link: "",
      title: "",
      time: "",
      content: "",
      id: uuidv4(),
    });
    setList(arr);
  }, [List]);
  const __popup = useCallback((state) => {
    setIsPopup(state);
  }, []);

  useEffect(() => {
    Fstore.collection("config")
      .doc("popup")
      .get()
      .then((res) => {
        if (res.exists) {
          const list = res.data().list;
          setList(list);
        }
      });
    return () => {};
  }, []);

  return (
    <Wrapper
    // isOn={title && content && link && time.length === 10}
    >
      <div className="container">
        <Animation className="ani">
          <div className="top">
            <div className="title">팝업 관리</div>
            <div className="btn-wrapper">
              <button className="insert" onClick={__addCard}>
                <figure>
                  <img src="/assets/common/insert.svg" alt="" />
                </figure>
                추가하기
              </button>
              <button
                className="preview"
                onClick={() => {
                  __popup(true);
                }}
              >
                미리보기
              </button>
              <button
                className="save"
                onClick={() => {
                  // if (title && content && link && time.length === 10) {
                  __save();
                  // }
                }}
              >
                저장하기
              </button>
            </div>
          </div>
          {List.map((item, idx) => {
            return (
              <Animation key={idx}>
                <Box data={item} __update={__update} index={idx} />
              </Animation>
            );
          })}
        </Animation>
      </div>
      {isPopup ? (
        <Preview
          // title={title}
          // content={content}
          // link={link}
          list={List}
          __popup={__popup}
        />
      ) : undefined}
    </Wrapper>
  );
}

export default PopupManager;
