import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.section`
  background-image: image-set(
    url("/assets/main/section7/background.png") 1x,
    url("/assets/main/section7/background@2x.png") 2x,
    url("/assets/main/section7/background@3x.png") 3x
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 510px;
  color: white;
  padding: 133.5px 0;
  box-sizing: border-box;
  & > .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .left {
      & > figure {
        width: 231px;
        height: 52.5px;
        margin-bottom: 28.5px;
      }
      & > .title {
        font-size: 42px;
        font-weight: bold;
        line-height: 1.43;
        font-family: "cafe24";
        & > span {
          color: #ffaa00;
        }
      }
      & > .sub {
        font-size: 18px;
        font-weight: 500;
        margin-top: 17px;
        line-height: 1.61;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 32px 0;
    height: 386px;
    & > .container {
      & > .left {
        & > figure {
          width: 188.7px;
          height: 42.9px;
          margin-bottom: 26.3px;
        }
        & > .title {
          font-size: 30px;
          line-height: 1.3;
        }
        & > .sub {
          font-size: 14px;
          line-height: 1.64;
          margin-top: 13px;
        }
      }
    }
  }
  @media screen and (max-width: 769px) {
    background-image: image-set(
      url("/assets/main/section7/backgroundmb.png") 1x,
      url("/assets/main/section7/backgroundmb@2x.png") 2x,
      url("/assets/main/section7/backgroundmb@3x.png") 3x
    );
    height: 424px;
    padding: 73.6px 0;
    & > .container {
      justify-content: center;
      & > .left {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > figure {
          margin-bottom: 23px;
        }
        & > .sub {
          margin-top: 16px;
        }
      }
    }
  }
`;

function Section7() {
  const useragent = useSelector((state) => state.config.useragent);
  return (
    <Wrapper useragent={useragent}>
      <div className="container">
        <div className="left">
          <figure>
            <img src="/assets/main/section7/logo.svg" alt="" />
          </figure>
          <div className="title">
            소상공인의 <br /> 든든한 사업파트너 <br /> <span>똑똑한 뭉치</span>
            와{useragent === "mobile" ? <br /> : undefined} 함께 하세요!
          </div>
          <div className="sub">
            부담스럽고 어려운 매장 외 고객 관리 <br /> 이젠 뭉치가 하나로 단단히
            뭉쳐드립니다!
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Section7;
