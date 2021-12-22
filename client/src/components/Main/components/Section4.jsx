import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 885px;
  width: 100%;
  padding-top: 145px;
  padding-bottom: 182px;
  box-sizing: border-box;
  & > .container {
    display: flex;
    align-items: center;
    & > .left {
      margin-right: 14px;
      & > figure {
        width: 112px;
        height: 112px;
      }
      & > .tag {
        margin-top: 29px;
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: bold;
        color: #007fff;
      }
      & > .title {
        white-space: nowrap;
        font-size: 42px;
        font-weight: bold;
        font-family: "cafe24";
        line-height: 1.43;
        color: #191f28;
      }
      & > .sub {
        font-size: 18px;
        font-weight: 500;
        line-height: 1.61;
        color: #191f28;
        margin-top: 14px;
        margin-bottom: 29px;
      }
      & > .bottom {
        width: 401px;
        height: 72px;
        border-radius: 10px;
        background-color: white;
        padding-left: 17px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.53;
        color: #434343;
        background-color: #f7f8fa;
      }
    }
    & > .right {
      & > img {
        width: 693px;
        height: 544.6px;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    height: 668px;
    padding-top: 120px;
    padding-bottom: 140px;
    & > .container {
      & > .left {
        margin-right: 15px;
        & > figure {
          width: 79px;
          height: 79px;
        }
        & > .tag {
          font-size: 16px;
          margin-top: 17px;
          margin-bottom: 12px;
        }
        & > .title {
          font-size: 30px;
          line-height: 1.3;
        }
        & > .sub {
          font-size: 14px;
          margin-bottom: 23px;
        }
        & > .bottom {
          width: 320px;
        }
      }
      & > .right {
        & > img {
          width: 401px;
          height: 333.4px;
        }
      }
    }
  }
  @media screen and (max-width: 769px) {
    height: 948px;
    padding-top: 99px;
    padding-bottom: 97px;
    & > .container {
      flex-direction: column;
      text-align: center;
      & > .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: unset;
        & > .tag {
          margin-top: 18px;
          margin-bottom: 14px;
        }
        & > .bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: unset;
        }
      }
      & > .right {
        margin-top: 36.6px;
        img > {
          width: 360px;
        }
      }
    }
  }
`;

function Section4() {
  return (
    <Wrapper>
      <div className="container">
        <div className="left">
          <figure>
            <img src="/assets/main/section2/house.svg" alt="" />
          </figure>
          <div className="tag">뭉치 POS</div>
          <div className="title">
            뭉치 POS 하나로 <br /> 재고관리부터 소통까지
          </div>
          <div className="sub">
            재고 및 주문 관리와 알림톡을 제공 솔루션으로 <br /> 간편하게
            소비자에게 쇼핑 정보를 알려주고 <br /> 결제를 진행받을 수 있습니다
          </div>
          <div className="bottom">
            알림톡 건당 10원 <br /> 앱 결제 시 수수료 발생
          </div>
        </div>
        <figure className="right">
          <img
            src="/assets/main/section4/pos.png"
            srcSet="/assets/main/section4/pos@2x.png 2x , /assets/main/section4/pos@3x.png 3x"
            alt=""
          />
        </figure>
      </div>
    </Wrapper>
  );
}

export default Section4;
