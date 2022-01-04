import React, { useCallback } from "react";
import { useState } from "react";
import styled from "styled-components";

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
  position: absolute;
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
  }
`;

function Preview({ list, __popup }) {
  const [nowidx, setNowidx] = useState(list.length - 1);
  const __removePopup = useCallback(() => {
    if (nowidx > 0) {
      setNowidx(nowidx - 1);
    } else {
      __popup(false);
    }
  }, [__popup, nowidx]);

  return (
    <Wrapper>
      <div className="back" />

      <div className="box">
        <figure className="cancel" onClick={__removePopup}>
          <img src="/assets/popup/cancel.svg" alt="닫기" />
        </figure>
        <div className="title">{list[nowidx].title}</div>
        <div className="content">{list[nowidx].content}</div>
        <a href={list[nowidx].link} target={"_blank"} rel="noreferrer">
          자세히보기
        </a>
      </div>
    </Wrapper>
  );
}

export default Preview;
