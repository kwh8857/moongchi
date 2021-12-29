import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import firebaseApp from "../config/firebaseApp";
import Preview from "./components/Preview";
import { Animation } from "../styles/Animation";

const arr = [
  { tag: "제목", type: "title", placeholder: "제목 입력" },
  { tag: "내용", type: "content", placeholder: "내용 입력" },
  { tag: "링크", type: "link", placeholder: "링크 입력" },
  { tag: "게시마감일", type: "time", placeholder: "YYYY-MM-DD" },
];
const Fstore = firebaseApp.firestore();

const Wrapper = styled.main`
  height: 100%;
  & > .container {
    height: 100%;
    display: flex;
    justify-content: center;
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
          grid-template-columns: repeat(2, 153px);
          column-gap: 17px;
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
      & > .box {
        height: 456px;
        width: 100%;
        background-color: white;
        border-radius: 10px;
        border: solid 1px #dbdbdb;
        margin-top: 36px;
        padding: 27px 25px;
        box-sizing: border-box;
        display: grid;
        row-gap: 23px;
        & > .input-wrapper {
          & > .title {
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 6px;
          }
          & > input {
            width: 100%;
            height: 44px;
            border-radius: 5px;
            border: solid 1px #dbdbdb;
            padding: 11px 13px;
            box-sizing: border-box;
            font-size: 15px;
            font-weight: 500;
          }
          & > textarea {
            font-size: 15px;
            font-weight: 500;
            height: 93px;
            width: 100%;
            border-radius: 5px;
            border: solid 1px #dbdbdb;
            padding: 12px 13px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  ${(props) => {
    return css`
      & > .container {
        & > .ani {
          & > .top {
            & > .btn-wrapper {
              & > .preview {
                color: ${props.isOn ? "#434343" : "wihte"};
              }
              & > .save {
                background-color: ${props.isOn ? "#007fff" : "#dbdbdb;"};
              }
            }
          }
        }
      }
    `;
  }}
`;

function PopupManager() {
  const dispatch = useDispatch();
  const [isPopup, setIsPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [time, setTime] = useState("");

  const __save = useCallback(() => {
    Fstore.collection("config")
      .doc("popup")
      .set({
        title,
        content,
        link,
        time,
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
  }, [title, content, link, time, dispatch]);

  const __popup = useCallback((state) => {
    setIsPopup(state);
  }, []);

  useEffect(() => {
    Fstore.collection("config")
      .doc("popup")
      .get()
      .then((res) => {
        if (!res.emty) {
          const { title, content, time, link } = res.data();
          setTitle(title);
          setContent(content);
          setTime(time);
          setLink(link);
        }
      });
    return () => {};
  }, []);

  return (
    <Wrapper isOn={title && content && link && time.length === 10}>
      <div className="container">
        <Animation className="ani">
          <div className="top">
            <div className="title">팝업 관리</div>
            <div className="btn-wrapper">
              <button
                className="preview"
                onClick={() => {
                  if (title && content && link && time.length === 10) {
                    __popup(true);
                  }
                }}
              >
                미리보기
              </button>
              <button
                className="save"
                onClick={() => {
                  if (title && content && link && time.length === 10) {
                    __save();
                  }
                }}
              >
                저장하기
              </button>
            </div>
          </div>
          <div className="box">
            {arr.map(({ tag, type, placeholder }, idx) => {
              return (
                <div key={idx} className="input-wrapper">
                  <div className="title">{tag}</div>
                  {type !== "content" ? (
                    <input
                      type="text"
                      style={type === "time" ? { width: "211px" } : undefined}
                      maxLength={type === "time" ? 10 : 100}
                      value={
                        type === "time" ? time : type === "title" ? title : link
                      }
                      onChange={(e) => {
                        if (type === "time") {
                          const number = e.target.value.replace(
                            /[^0-9-]/gi,
                            ""
                          );
                          const val = number.replace(
                            /(\d{4})(\d{2})(\d{2})/,
                            "$1-$2-$3"
                          );
                          setTime(val);
                        }
                        if (type === "title") {
                          setTitle(e.target.value);
                        }
                        if (type === "link") {
                          setLink(e.target.value);
                        }
                      }}
                      placeholder={placeholder}
                    />
                  ) : (
                    <textarea
                      rows="3"
                      value={content}
                      placeholder={placeholder}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Animation>
      </div>
      {isPopup ? (
        <Preview
          title={title}
          content={content}
          link={link}
          __popup={__popup}
        />
      ) : undefined}
    </Wrapper>
  );
}

export default PopupManager;
