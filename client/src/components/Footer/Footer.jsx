import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";

const Wrapper = styled.footer`
  width: 100%;
  height: 277px;
  background-color: #f7f8fa;
  padding-top: 77px;
  box-sizing: border-box;
  & > .container {
    & > figure {
      width: 158.6px;
      height: 39.5px;
    }
    & > .middle {
      margin-top: 9.5px;
      margin-bottom: 11px;
      font-size: 12px;
      line-height: 1.67;
      color: #434343;
    }
    & > .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      & > .left {
        font-size: 12px;
        color: #434343;
      }
      & > .right {
        display: grid;
        grid-template-columns: 62px 101px;
        column-gap: 8px;
        & > button {
          background-color: transparent;
          cursor: pointer;
          height: 26px;
          border-radius: 5px;
          border: solid 1px #a9adb3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 500;
          color: #434343;
        }
      }
    }
  }
  @media screen and (max-width: 769px) {
    padding-top: 44.2px;
    & > .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      & > .middle {
        text-align: center;
        font-size: 10px;
        line-height: 1.6;
        margin-top: 8.2px;
        margin-bottom: 18;
      }
      & > .bottom {
        flex-direction: column;
        justify-content: unset;
        align-items: center;
        & > .left {
          font-size: 10px;
          margin-bottom: 18.3px;
        }
      }
    }
  }
`;
function Footer() {
  const location = useLocation();
  const useragent = useSelector((state) => state.config.useragent);
  return location.pathname === "/down" ? (
    <></>
  ) : (
    <Wrapper>
      <div className="container">
        <figure>
          <img src="/assets/footer/logo.svg" alt="moogchi" />
        </figure>
        <div className="middle">
          뭉치 | 경상북도 영천시 금호읍 대구대길333 창업보
          {useragent === "mobile" ? <br /> : ""}육센터 2호관 1202호 (대구대학교)
          <br /> 사업자번호 203-27-11141 | 대표번호
          {useragent === "mobile" ? <br /> : ""} 053-853-8420 | 이메일
          abcd0000@kakao.com
        </div>
        <div className="bottom">
          <div className="left">©MOOGCHI. All rights reserved.</div>
          <div className="right">
            <button>이용약관</button>
            <button>개인정보취급방침</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Footer;
