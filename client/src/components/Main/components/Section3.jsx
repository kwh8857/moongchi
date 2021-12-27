import React, { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 753px;
  background-color: #f7f8fa;
  width: 100%;
  padding-top: 82px;
  padding-bottom: 110px;
  box-sizing: border-box;
  & > .container {
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translate3d(0, 10%, 0);
    & > .left {
      margin-right: 158px;
      & > figure {
        width: 122px;
        height: 122px;
      }
      & > .tag {
        margin-top: 27px;
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: bold;
        color: #007fff;
      }
      & > .title {
        font-size: 42px;
        font-weight: bold;
        font-family: "cafe24";
        line-height: 1.33;
        color: #191f28;
      }
      & > .sub {
        font-size: 18px;
        font-weight: 500;
        line-height: 1.61;
        color: #191f28;
        margin-top: 11px;
        margin-bottom: 41px;
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
      }
    }
    & > .right {
      & > img {
        width: 541.4px;
        height: 568.6px;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    height: 668px;
    padding-top: 140px;
    & > .container {
      & > .left {
        margin-right: 70px;
        & > figure {
          width: 79px;
          height: 79px;
        }
        & > .tag {
          margin-top: 17px;
          margin-bottom: 14px;
          font-size: 16px;
        }
        & > .title {
          font-size: 30px;
          line-height: 1.3;
        }
        & > .sub {
          font-size: 14px;
          margin: 23px 0;
        }
        & > .bottom {
          width: 305px;
          height: 72px;
        }
      }
      & > .right {
        & > img {
          width: 361px;
          height: 379.2px;
        }
      }
    }
  }
  @media screen and (max-width: 769px) {
    height: 1024px;
    padding-top: 101px;
    & > .container {
      flex-direction: column;
      text-align: center;
      .left {
        margin-right: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > .bottom {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: unset;
        }
      }
      & > .right {
        margin-top: 42.8px;
        & > img {
          width: 360px;
        }
      }
    }
  }
`;

function Section3({ handleScroll }) {
  const dom = useRef(null);
  useEffect(() => {
    let observer;
    const { current } = dom;
    if (current) {
      observer = new IntersectionObserver(
        (e) => {
          handleScroll(e, dom);
        },
        {
          threshold: 0.2,
          root: null,
          rootMargin: "0px",
        }
      );
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [dom, handleScroll]);
  return (
    <Wrapper>
      <div className="container" ref={dom}>
        <div className="left">
          <figure>
            <img src="/assets/main/section2/man.svg" alt="" />
          </figure>
          <div className="tag">뭉치 알림톡 쇼핑</div>
          <div className="title">
            카카오 알림톡으로 <br /> 우리 동네 가게 <br /> 온라인 쇼핑
          </div>
          <div className="sub">
            별도의 앱 개발/배포/설치/인증과정 없이 <br /> 오직 카카오 알림톡
            발송만으로 간편하게! <br /> 우리 동네 가게 온라인 쇼핑은 뭉치와
            함께하세요.
          </div>
          <div className="bottom">
            알림톡 건당 10원 <br /> 앱 결제시 수수료 발생
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

export default Section3;
