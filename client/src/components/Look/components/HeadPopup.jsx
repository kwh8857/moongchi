import React from "react";
import styled from "styled-components";

const Popup = styled.section`
  position: fixed;
  top: 64px;
  left: 0;
  height: 129px;
  width: 100%;
  box-shadow: 0 5px 8px 0 rgba(69, 71, 101, 0.1);
  border: solid 1px #dbdbdb;
  background-color: white;
  & > .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .left {
      display: flex;
      align-items: center;
      & > figure {
        width: 68.5px;
        height: 54.8px;
        margin-right: 21.4px;
      }
      & > .title {
        font-size: 22px;
        font-weight: bold;
        color: #434343;
        font-family: "cafe24";
      }
    }
    & > button {
      border-radius: 57px;
      background-color: #337dff;
      width: 214px;
      height: 47px;
      display: flex;
      font-size: 15px;
      font-weight: bold;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 30px;
      cursor: pointer;
      padding-right: 17px;
      box-sizing: border-box;
      & > figure {
        width: 31.3px;
        height: 18.7px;
      }
    }
  }
`;

function HeadPopup() {
  return (
    <Popup>
      <div className="container">
        <div className="left">
          <figure>
            <img src="/assets/look/email.svg" alt="" />
          </figure>
          <div className="title">
            이메일 인증하고 <br /> 지금 바로 뭉치를 다운로드해보세요!
          </div>
        </div>
        <button className="right">
          <span>뭉치 다운로드 하기</span>
          <figure>
            <img src="/assets/main/arrow.svg" alt="" />
          </figure>
        </button>
      </div>
    </Popup>
  );
}

export default HeadPopup;
