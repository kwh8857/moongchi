import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const arr = [
  {
    title: "뭉치 POS",
    sub: `우리 가게 단골관리와
재고관리를 함께!`,
    tag: "소상공인",
    logo: "house.svg",
    image: "pos",
  },
  {
    title: "뭉치 알림톡 쇼핑",
    sub: `카카오 알림톡으로
손쉽게 동네 가게 온라인 쇼핑!`,
    tag: "소비자",
    logo: "man.svg",
    image: "phone",
  },
];

const Wrapper = styled.section`
  height: 996px;
  width: 100%;
  padding-top: 168px;
  box-sizing: border-box;
  & > .container {
    text-align: center;
    & > .title {
      font-size: 39px;
      font-weight: bold;
      line-height: 1.31;
      font-family: "cafe24";
      position: relative;
      opacity: 0;
      transform: translate3d(0, 8%, 0);
      & > .circle {
        position: absolute;
        top: -12px;
        right: 395px;
        display: grid;
        column-gap: 28px;
        grid-template-columns: repeat(2, 8px);
        & > div {
          width: 8px;
          height: 8px;
          background-color: #007fff;
          border-radius: 8px;
        }
      }
      & > span {
        color: #007fff;
      }
    }
    & > .card-wrapper {
      opacity: 0;
      transform: translate3d(0, 8%, 0);
      margin-top: 44px;
      display: grid;
      grid-template-columns: repeat(2, 489px);
      column-gap: 50px;
      justify-content: center;
      & > .card {
        width: 100%;
        height: 600px;
        border-radius: 20px;
        box-shadow: 0 3px 20px 0 rgba(69, 71, 101, 0.16);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 29px;
        box-sizing: border-box;
        & > .logo {
          width: 79px;
          height: 79px;
        }
        & > .tag {
          margin-top: 10px;
          width: 87px;
          height: 29px;
          background-color: #007fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          font-family: "cafe24";
          border-radius: 50px;
          color: white;
        }
        & > .title {
          font-size: 25px;
          font-weight: bold;
          color: #191f28;
          font-family: "cafe24";
          margin-top: 17px;
          margin-bottom: 6px;
        }
        & > .sub {
          font-size: 14px;
          white-space: pre-wrap;
          line-height: 1.36;
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    height: 954px;
    padding-top: 156px;
    & > .container {
      & > .title {
        font-size: 30px;
        & > .circle {
          right: 266px;
          column-gap: 22px;
        }
      }
      & > .card-wrapper {
        margin-top: 48px;
        grid-template-columns: repeat(2, 344px);
        column-gap: 16px;
        & > .card {
          height: 499px;
        }
      }
    }
  }
  @media screen and (max-width: 769px) {
    height: 1464px;
    padding-top: 161px;
    & > .container {
      & > .title {
        & > .circle {
          right: 75px;
        }
      }
      & > .card-wrapper {
        margin-top: 54px;
        grid-template-columns: unset;
        grid-template-rows: repeat(2, 499px);
        column-gap: unset;
        row-gap: 32px;
        & > .card {
          height: 100%;
        }
      }
    }
  }
`;

function Section2({ handleScroll }) {
  const dom = useRef(null);
  const cardDom = useRef(null);
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
  useEffect(() => {
    let observer;
    const { current } = cardDom;
    if (current) {
      observer = new IntersectionObserver(
        (e) => {
          handleScroll(e, cardDom);
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
  }, [cardDom, handleScroll]);
  return (
    <Wrapper>
      <div className="container">
        <div className="title" ref={dom}>
          <div className="circle">
            <div />
            <div />
          </div>
          이젠 한번에
          <span> 뭉치</span>
          고 <br /> 깔끔하게 관리하세요!
        </div>
        <div className="card-wrapper" ref={cardDom}>
          {arr.map(({ title, tag, image, logo, sub }, idx) => {
            return (
              <div className="card" key={idx}>
                <figure className="logo">
                  <img src={`/assets/main/section2/${logo}`} alt="" />
                </figure>
                <div className="tag">{tag}</div>
                <div className="title">{title}</div>
                <div className="sub">{sub}</div>
                <figure
                  className="main"
                  style={{ marginTop: idx === 1 ? "23px" : "3px" }}
                >
                  <img
                    src={`/assets/main/section2/${image}.jpg`}
                    srcSet={`/assets/main/section2/${image}@2x.jpg 2x , /assets/main/section2/${image}@3x.jpg 3x`}
                    alt=""
                  />
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default Section2;
