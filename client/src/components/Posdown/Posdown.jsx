import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Email from "./components/Email";
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 64px;
  background-color: #f7f8fa;
  overflow-y: scroll;

  & > .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    & > .logo {
      width: 43.5px;
      height: 52.2px;
      margin-bottom: 21.4px;
    }
    & > .title {
      font-size: 38px;
      font-weight: bold;
      color: #191f28;
      font-family: "cafe24";
    }
    & > .sub {
      margin-top: 10px;
      margin-bottom: 32px;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.56;
      color: #191f28;
      & > span {
        color: #007fff;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    & > .container {
      & > .logo {
        width: 36.2px;
        height: 43.4px;
        margin-bottom: 18.8px;
      }
      & > .title {
        font-size: 27px;
      }
      & > .sub {
        font-size: 14px;
        margin-top: 15px;
        margin-bottom: 33px;
        line-height: 1.64;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 114px 0;
    & > .container {
      justify-content: unset;
    }
  }
`;
function Posdown() {
  const useragent = useSelector((state) => state.config.useragent);
  return (
    <Wrapper>
      <div className="container">
        <figure className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="43.514"
            height="52.217"
            viewBox="0 0 43.514 52.217"
          >
            <path
              d="M50.264 22.926H37.836V4.5H19.179v18.426H6.75l21.757 21.5zM6.75 50.571v6.146h43.514v-6.146z"
              transform="translate(-6.75 -4.5)"
              style={{ fill: "#007fff" }}
            />
          </svg>
        </figure>
        <div className="title">뭉치 POS 다운로드</div>
        <div className="sub">
          뭉치는 소상공인과 함께 성장하고자 모든 개발
          {useragent !== "desktop" ? <br /> : undefined} 프로그램을
          <span> 무료로 배포</span>합니다.
          {useragent === "desktop" ? <br /> : undefined}간단한 이메일 인증과
          {useragent !== "desktop" ? <br /> : undefined}함께 든든한 판매 파트너
          뭉치를 만나보세요!
        </div>
        <Email useragent={useragent} />
      </div>
    </Wrapper>
  );
}

export default Posdown;
