import React, { useCallback } from "react";
import { useState } from "react";
import styled from "styled-components";
import Box from "./components/Box";

const Wrapper = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  z-index: 9500;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .back {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
  }
  & > .box {
    box-shadow: 0 3px 20px 0 rgba(69, 71, 101, 0.16);
    text-align: center;
    animation: fadeIn 0.4s;
    width: 663px;
    position: absolute;
    background-color: white;
    border-radius: 5px;
    padding-top: 49px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 49px 63.5px 41px 63.5px;
    & > .title {
      width: 506px;
      font-size: 25px;
      font-weight: bold;
      line-height: 1.4;
    }
    & > .content {
      width: 536px;
      margin-top: 15px;
      margin-bottom: 26px;
      font-size: 17px;
      line-height: 1.76;
      color: #443b31;
      white-space: pre-line;
    }
    & > a {
      width: 153px;
      height: 44px;
      border-radius: 6px;
      background-color: #007fff;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > .cancel {
      cursor: pointer;
      position: absolute;
      top: 24.2px;
      right: 22.5px;
      width: 21.7px;
      height: 21.7px;
      & > figure {
        background-color: white;
      }
    }
    & > .check {
      position: absolute;
      display: flex;
      align-items: center;
      right: 27px;
      bottom: 21px;
      font-size: 14px;
      font-weight: 500;
      color: #434343;
      & > button {
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: white;
        cursor: pointer;
        margin-right: 4px;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    & > .box {
      width: 500px;
    }
  }
  @media screen and (max-width: 769px) {
    & > .box {
      width: 320px;
      box-sizing: border-box;
      padding-bottom: 74px;
      & > .cancel {
        top: 18px;
        right: 18.7px;
        width: 18.3px;
        height: 18.3px;
      }
      & > .title {
        width: 200px;
        font-size: 19px;
      }
      & > .content {
        max-height: 250px;
        overflow: scroll;
        width: 250px;
        font-size: 13px;
      }
      & > .check {
        right: unset;
        bottom: 31px;
      }
    }
  }
`;
function FirstPopup({ data, cancel }) {
  const [nowidx, setNowidx] = useState(data.length - 1);
  const setDate = useCallback(
    (id, isCheck) => {
      if (isCheck) {
        const now = new Date();
        now.setDate(now.getDate() + 1);
        document.cookie = `${id}=id;expires=${now.toGMTString()}`;
      }
      if (nowidx > 0) {
        setNowidx(nowidx - 1);
      } else {
        cancel(undefined);
      }
    },
    [cancel, nowidx]
  );

  return (
    <Wrapper>
      <div className="back" />
      <Box data={data[nowidx]} index={nowidx} __setDate={setDate} />;
    </Wrapper>
  );
}

export default FirstPopup;
