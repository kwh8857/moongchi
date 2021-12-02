import React from "react";
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
      & > .title {
        font-size: 42px;
        font-weight: bold;
        line-height: 1.43;
        font-family: "cafe24";
        & > span {
          background-color: #007fff;
        }
      }
      & > .sub {
        font-size: 18px;
        font-weight: 500;
        margin-top: 17px;
        line-height: 1.61;
      }
    }
    & > figure {
      width: 144.6px;
      height: 172.6px;
    }
  }
`;

function Section7() {
  return (
    <Wrapper>
      <div className="container">
        <div className="left">
          <div className="title">
            소상공인의 <br /> 든든한 사업파트너 <br /> <span>똑똑한 뭉치</span>
            와 함께 하세요!
          </div>
          <div className="sub">
            부담스럽고 어려운 매장 외 고객 관리 <br /> 이젠 뭉치가 하나로 단단히
            뭉쳐드립니다!
          </div>
        </div>
        <figure>
          <img src="/assets/main/section7/logo.svg" alt="" />
        </figure>
      </div>
    </Wrapper>
  );
}

export default Section7;
