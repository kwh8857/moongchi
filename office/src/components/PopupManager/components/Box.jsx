import React from "react";
import styled from "styled-components";
const arr = [
  { tag: "제목", type: "title", placeholder: "제목 입력" },
  { tag: "내용", type: "content", placeholder: "내용 입력" },
  { tag: "링크", type: "link", placeholder: "링크 입력" },
  { tag: "게시마감일", type: "time", placeholder: "YYYY-MM-DD" },
];
const Card = styled.div`
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
  position: relative;
  & > .input-wrapper {
    & > .cancel {
      position: absolute;
      right: 15px;
      top: 15px;
      background-color: white;
      cursor: pointer;
    }
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
`;
function Box({
  data: { title, content, link, time },
  __update,
  index,
  __remove,
}) {
  return (
    <Card>
      {arr.map(({ tag, type, placeholder }, idx) => {
        return (
          <div key={idx} className="input-wrapper">
            <button
              className="cancel"
              onClick={() => {
                __remove(index);
              }}
            >
              <figure>
                <img src="/assets/question/cancel.svg" alt="" />
              </figure>
            </button>
            <div className="title">{tag}</div>
            {type !== "content" ? (
              <input
                type="text"
                style={type === "time" ? { width: "211px" } : undefined}
                maxLength={type === "time" ? 10 : 100}
                value={type === "time" ? time : type === "title" ? title : link}
                onChange={(e) => {
                  if (type === "time") {
                    const number = e.target.value.replace(/[^0-9-]/gi, "");
                    const val = number.replace(
                      /(\d{4})(\d{2})(\d{2})/,
                      "$1-$2-$3"
                    );
                    __update(val, type, index);
                  }
                  if (type === "title") {
                    __update(e.target.value, type, index);
                  }
                  if (type === "link") {
                    __update(e.target.value, type, index);
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
                  __update(e.target.value, type, index);
                }}
              />
            )}
          </div>
        );
      })}
    </Card>
  );
}

export default Box;
