import React from "react";
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
    text-align: center;
    animation: fadeIn 0.4s;
    width: 663px;
    position: relative;
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
  @media screen and (max-width: 1024px) {
    & > .box {
      width: 500px;
    }
  }
  @media screen and (max-width: 769px) {
    & > .box {
      width: 320px;
      box-sizing: border-box;
      & > .title {
        width: 200px;
        font-size: 19px;
      }
      & > .content {
        width: 250px;
        font-size: 13px;
      }
    }
  }
`;
function FirstPopup({ data: { title, link, content }, cancel }) {
  return (
    <Wrapper>
      <div className="back" />
      <div className="box">
        <button
          className="cancel"
          onClick={() => {
            cancel(undefined);
          }}
        >
          <figure>
            <img src="/assets/down/cancel.svg" alt="" />
          </figure>
        </button>
        <div className="title">{title}</div>
        <div className="content">{content}</div>
        <a href={link} target={"_blank"} rel="noreferrer">
          자세히보기
        </a>
      </div>
    </Wrapper>
  );
}

export default FirstPopup;
