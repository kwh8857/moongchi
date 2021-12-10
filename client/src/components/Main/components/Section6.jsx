import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  height: 897px;
  & > .top {
    height: 724px;
    padding-top: 102px;
    box-sizing: border-box;
    padding-bottom: 160px;
    & > .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > .left {
        & > .title {
          font-size: 46px;
          font-weight: bold;
          line-height: 1.3;
          color: #191f28;
          font-family: "cafe24";
          & > span {
            color: #007fff;
          }
        }
        & > .sub {
          margin-top: 15px;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.61;
          color: #191f28;
        }
      }
      & > .right {
        & > figure {
          width: 444px;
          height: 462px;
        }
      }
    }
  }
  & > .bottom {
    height: 173px;
    background-color: #282a2b;
    & > .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > .left {
        display: flex;
        align-items: center;
        & > figure {
          margin-right: 27.6px;
          width: 85px;
          height: 68px;
        }
        & > .title {
          font-size: 29px;
          font-weight: bold;
          line-height: 1.38;
          color: white;
          font-family: "cafe24";
        }
      }
      & > button {
        cursor: pointer;
        width: 276px;
        height: 61px;
        border-radius: 50px;
        background-color: #1d5ff2;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        & > figure {
          margin-right: 11.7px;
          width: 18.6px;
          height: 22.4px;
        }
      }
    }
  }
`;

function Section6() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="top">
        <div className="container">
          <div className="left">
            <div className="title">
              내 <span>단골</span>은 <br /> 스스로 관리하자!
            </div>
            <div className="sub">
              플랫폼이나 외부 프로그램이 아닌 점주가 스스로 <br /> 관리할 수
              있어 간편하게 배달시장에 진입 및 <br /> 독립성을 확보할 수
              있습니다.
            </div>
          </div>
          <figure className="right">
            <img
              src="/assets/main/section6/stamp.png"
              srcSet="/assets/main/section6/stamp@2x.png 2x,/assets/main/section6/stamp@3x.png 3x"
              alt=""
            />
          </figure>
        </div>
      </div>
      <div className="bottom">
        <div className="container">
          <div className="left">
            <figure>
              <img src="/assets/main/section6/mail.svg" alt="" />
            </figure>
            <div className="title">
              이메일 인증하고 <br /> 지금 바로 뭉치를 다운로드해보세요!
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/down");
            }}
          >
            <figure>
              <img src="/assets/header/download.svg" alt="" />
            </figure>
            <span>뭉치 POS 무료 다운로드</span>
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Section6;
