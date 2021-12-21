import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
const Insert = styled.div`
  & > .title {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 6px;
    & > span {
      margin-left: 4px;
      font-size: 11px;
      font-weight: normal;
      color: #007fff;
    }
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
  & > input::placeholder {
    color: #a8a8a8;
  }
  & > textarea::placeholder {
    color: #a8a8a8;
  }
  & > textarea {
    font-size: 15px;
    font-weight: 500;
    border: solid 1px #dbdbdb;
    border-radius: 5px;
    width: 100%;
    padding: 11px 13px;
    box-sizing: border-box;
  }
  ${(props) => {
    return css`
      margin-bottom: ${props.type === "category" ? "3px" : 0};
      & > textarea {
        height: ${props.type === "title" ? "70px" : "93px"};
      }
    `;
  }}
`;
function InputWrapper({
  data: { title, sub, type, placeholder, patcher },
  index,
  content,
}) {
  const dispatch = useDispatch();
  const __update = useCallback(
    (value) => {
      dispatch({
        type: `@database/PREVIEW_${patcher}`,
        index,
        payload: value,
      });
    },
    [patcher, index, dispatch]
  );
  const [Text, setText] = useState("");
  useEffect(() => {
    setText(content);
    return () => {};
  }, [content, type]);
  return (
    <Insert type={type}>
      <div className="title">
        {title} <span>{sub ? sub : ""}</span>
      </div>
      {type === "category" || type === "link" ? (
        <input
          type="text"
          value={Text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder={placeholder}
          onBlur={(e) => {
            __update(e.target.value);
          }}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          value={Text}
          onChange={(e) => {
            var str_arr = e.target.value.split("\n");
            if (
              (type === "title" && str_arr.length < 3) ||
              (type === "content" && str_arr.length < 4)
            ) {
              setText(e.target.value);
            }
          }}
          onBlur={() => {
            __update(Text);
          }}
        />
      )}
    </Insert>
  );
}

export default InputWrapper;
