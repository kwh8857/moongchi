import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Popup = styled.section`
  position: fixed;
  z-index: 6000;
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
  @media screen and (max-width: 1024px) {
    height: 139px;
    & > .container {
      & > .left {
        & > figure {
          width: 62.2px;
          height: 49.7px;
          margin-right: 19.4px;
        }
        & > .title {
          font-size: 19px;
          line-height: 1.37;
        }
      }
      & > button {
        width: 168px;
        height: 37px;
        font-size: 12px;
        white-space: nowrap;
        padding-left: 15px;
        padding-right: 13px;
        & > figure {
          width: 24.6px;
          height: 14.8px;
        }
      }
    }
  }
  @media screen and (max-width: 769px) {
    & > .container {
      flex-direction: column;
      justify-content: center;
      & > .left {
        & > .title {
          text-align: center;
          font-size: 15px;
          line-height: 1.47;
          margin-bottom: 11.5px;
        }
      }
    }
  }
`;

function HeadPopup() {
  const navigate = useNavigate();
  const useragent = useSelector((state) => state.config.useragent);
  return (
    <Popup>
      <div className="container">
        <div className="left">
          {useragent !== "mobile" ? (
            <figure>
              <img src="/assets/look/email.svg" alt="" />
            </figure>
          ) : undefined}
          <div className="title">
            이메일 인증하고 {useragent !== "mobile" ? <br /> : undefined} 지금
            바로 {useragent === "mobile" ? <br /> : undefined}뭉치를
            다운로드해보세요!
          </div>
        </div>
        <button
          className="right"
          onClick={() => {
            navigate("/down");
          }}
        >
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
