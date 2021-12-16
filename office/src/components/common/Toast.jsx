import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 484px;
  height: 55px;
  background-color: #434343;
  border-radius: 5px;
  left: 0;
  right: 0;
  margin: 5% auto;
  margin: auto;
  font-size: 16px;
  font-weight: bold;
  color: white;
  transition: bottom 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => {
    return css`
      bottom: ${props.isOn ? "25px" : "-90px"};
    `;
  }}
`;

function Toast() {
  const msg = useSelector((state) => state.config.toast);
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    if (msg) {
      setIsOn(true);
      setTimeout(() => {
        setIsOn(false);
      }, 1500);
    }
    return () => {};
  }, [msg]);
  return <Wrapper isOn={isOn}>{msg}</Wrapper>;
}

export default Toast;
