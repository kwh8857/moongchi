import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
function Infoinsert({ type, title, placeholder, patcher }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch({
      type: patcher,
      payload: value,
    });
    return () => {};
  }, [value, patcher, dispatch]);
  return (
    <Insert type={type}>
      <div className="title">{title}</div>
      <input
        value={value}
        type={type !== "password" ? "text" : "password"}
        maxLength={type === "password" ? 4 : type === "tel" ? 13 : 70}
        placeholder={placeholder}
        onChange={(e) => {
          if (type === "tel") {
            const number = e.target.value.replace(/[^0-9-]/gi, "");
            const val = number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
            setValue(val);
          } else if (type === "password") {
            const number = e.target.value.replace(/[^0-9-]/gi, "");
            setValue(number);
          } else {
            setValue(e.target.value);
          }
        }}
      />
    </Insert>
  );
}

export default Infoinsert;
