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
      margin-right: 158px;
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
        width: 482.4px;
        height: 507px;
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
            알림톡 건당 10원 <br /> 앱으로 카드 결제 시 카드수수료 발생
          </div>
        </div>
        <figure className="right">
          <img
            src="/assets/main/section3/phone.png"
            srcSet="/assets/main/section3/phone@2x.png 2x , /assets/main/section3/phone@3x.png 3x"
            alt=""
          />
        </figure>
      </div>
    </Wrapper>
  );
}

export default Section4;
