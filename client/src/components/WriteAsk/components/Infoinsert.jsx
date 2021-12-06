import React from "react";
import styled, { css } from "styled-components";

const Insert = styled.div`
  display: flex;
  align-items: center;
  & > .title {
    width: 68px;
    font-size: 14px;
    font-weight: bold;
    margin-right: 18px;
  }
  ${(props) => {
    return css`
      & > input {
        width: ${props.type === "title" ? "906px" : "310px"};
        height: 50px;
        border: solid 1px #dbdbdb;
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
        padding: 0 17px;
      }
    `;
  }}
`;
function Infoinsert({ type, title, placeholder }) {
  return (
    <Insert type={type}>
      <div className="title">{title}</div>
      <input
        type={type !== "password" ? "text" : "number"}
        maxLength={type === "password" ? 4 : 50}
        placeholder={placeholder}
      />
    </Insert>
  );
}

export default Infoinsert;
