import React from "react";
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
      margin-top: 44px;
      display: grid;
      grid-template-columns: repeat(2, 371px);
      column-gap: 50px;
      justify-content: center;
      & > .card {
        width: 100%;
        height: 533px;
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
`;

function Section2() {
  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          <div className="circle">
            <div />
            <div />
          </div>
          이젠 한번에
          <span> 뭉치</span>
          고 <br /> 깔끔하게 관리하세요!
        </div>
        <div className="card-wrapper">
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
