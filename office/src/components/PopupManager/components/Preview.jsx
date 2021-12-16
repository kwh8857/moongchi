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
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  & > .back {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
    position: absolute;
    left: 0;
    top: 0;
  }
  & > .box {
    animation: fadeIn 0.4s;
    width: 663px;
    position: relative;
    background-color: white;
    border-radius: 5px;
    padding-top: 49px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 49px;
    padding-bottom: 41px;
    & > .title {
      font-size: 25px;
      font-weight: bold;
      line-height: 1.4;
    }
    & > .content {
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
      width: 24px;
      height: 24px;
      cursor: pointer;
      position: absolute;
      top: 25px;
      right: 27px;
    }
  }
`;

function Preview({ title, content, link, __popup }) {
  return (
    <Wrapper>
      <div className="back" />
      <div className="box">
        <figure
          className="cancel"
          onClick={() => {
            __popup(false);
          }}
        >
          <img src="/assets/popup/cancel.svg" alt="닫기" />
        </figure>
        <div className="title">{title}</div>
        <div className="content">{content}</div>
        <a href={link} target={"_blank"}>
          자세히보기
        </a>
      </div>
    </Wrapper>
  );
}

export default Preview;
