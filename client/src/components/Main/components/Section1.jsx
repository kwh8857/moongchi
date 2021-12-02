import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
const Wrapper = styled.section`
  width: 100%;
  background-color: #f7f8fa;
  height: 701px;
  box-sizing: border-box;
  padding-top: 120px;
  & > .container {
    display: flex;
    & > .left {
      & > .title {
        font-size: 50px;
        font-weight: bold;
        line-height: 1.32;
        font-family: "cafe24";
        white-space: nowrap;
        & > span {
          color: #007fff;
        }
      }
      & > .sub {
        margin-top: 22px;
        font-size: 16px;
        line-height: 1.63;
      }
      & > button {
        margin-top: 29px;
        width: 249px;
        height: 54px;
        border-radius: 57px;
        background-color: #337dff;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-weight: bold;
        padding-left: 35px;
        padding-right: 19.7px;
        box-sizing: border-box;
        & > figure {
          width: 36.3px;
          height: 24px;
        }
      }
    }
    & > figure {
      width: 599px;
      height: 500px;
      margin-left: 56px;
    }
  }
`;
function Section1() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="container">
        <div className="left">
          <div className="title">
            손쉬운 쇼핑, <br /> 손쉬운 매장 관리 <br /> <span>뭉치</span>면
            쉽다!
          </div>
          <div className="sub">
            소상공인을 위한 강력한 무료 소프트웨어 <br />{" "}
            고객알림톡(전단지광고), 인앱결제(카드, 무통장, 포인트등) <br />{" "}
            판매/분석/재고/고객관리를 위한 풀메뉴 제공! <br /> 원스톱 서비스
            뭉치로 쉽고, 간편하게 진행해 보세요.
          </div>
          <button
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
        <figure>
          <img
            src="/assets/main/section1.png"
            srcSet="/assets/main/section1@2x.png 2x , /assets/main/section1@3x.png 3x"
            alt=""
          />
        </figure>
      </div>
    </Wrapper>
  );
}

export default Section1;
