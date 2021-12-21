import React from "react";
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
function InputWrapper({ data: { title, sub, type, placeholder } }) {
  return (
    <Insert type={type}>
      <div className="title">
        {title} <span>{sub ? sub : ""}</span>
      </div>
      {type === "category" || type === "link" ? (
        <input type="text" placeholder={placeholder} />
      ) : (
        <textarea placeholder={placeholder} />
      )}
    </Insert>
  );
}

export default InputWrapper;
