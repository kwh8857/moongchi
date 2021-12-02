import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
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
    position: relative;
    z-index: 200;
    width: 502px;
    height: 366px;
    border-radius: 13px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 54.2px;
    box-sizing: border-box;
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
    & > figure {
      width: 68.5px;
      height: 54.8px;
    }
    & > .title {
      margin-top: 16.1px;
      font-size: 27px;
      font-weight: bold;
      color: #191f28;
    }
    & > .sub {
      margin-top: 14px;
      font-size: 16px;
      line-height: 1.69;
      color: #191f28;
    }
    & > .send {
      width: 249px;
      height: 54px;
      border-radius: 57px;
      background-color: #007fff;
      display: flex;
      align-items: center;
      color: white;
    }
  }
`;
function Popup() {
  return (
    <Wrapper>
      <div className="back" />
      <div className="box">
        <button className="cancel">
          <figure>
            <img src="/assets/down/cancel.svg" alt="" />
          </figure>
        </button>
        <figure>
          <img src="/assets/down/opacity-mail.svg" alt="" />
        </figure>
        <div className="title">인증메일 전송 완료</div>
        <div className="sub">
          입력해주신 이메일로 인증메일을 전송했습니다. <br /> 확인 후 다운로드
          링크로 접속해주세요
        </div>
        <button className="send">
          <div>메인으로</div>
          <figure>
            <img src="/assets/main/arrow.svg" alt="" />
          </figure>
        </button>
      </div>
    </Wrapper>
  );
}

export default Popup;
