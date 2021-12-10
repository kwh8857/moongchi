import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Box = styled.div`
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
    cursor: pointer;
    width: 249px;
    height: 54px;
    border-radius: 57px;
    background-color: #007fff;
    display: flex;
    align-items: center;
    color: white;
    padding: 0 20px 0 25px;
    box-sizing: border-box;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    margin-top: 33px;
  }
`;

function PosPopup({ __navMain }) {
  const dispatch = useDispatch();
  return (
    <Box className="box">
      <button
        className="cancel"
        onClick={() => {
          dispatch({
            type: "POPUP",
            payload: {
              ispos: false,
              type: "",
              id: "",
            },
          });
        }}
      >
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
      <button className="send" onClick={__navMain}>
        <div>메인으로</div>
        <figure>
          <img src="/assets/main/arrow.svg" alt="" />
        </figure>
      </button>
    </Box>
  );
}

export default PosPopup;
