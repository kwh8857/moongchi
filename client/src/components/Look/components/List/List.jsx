import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const dummy = [
  {
    tag: "분석하기",
    title: `뭉치 POS로
우리 매장 분석하기`,
    sub: `뭉치 POS로 우리 매장의 고객 현황과 재고 현황 등
매장에 대한 모든 내용을 파악하고 분석할 수 있습니
다`,
    image: "",
  },
  {
    tag: "분석하기",
    title: `뭉치 POS로
우리 매장 분석하기`,
    sub: `뭉치 POS로 우리 매장의 고객 현황과 재고 현황 등
매장에 대한 모든 내용을 파악하고 분석할 수 있습니
다`,
    image: "",
  },
  {
    tag: "분석하기",
    title: `뭉치 POS로
우리 매장 분석하기`,
    sub: `뭉치 POS로 우리 매장의 고객 현황과 재고 현황 등
매장에 대한 모든 내용을 파악하고 분석할 수 있습니
다`,
    image: "",
  },
  {
    tag: "분석하기",
    title: `뭉치 POS로
우리 매장 분석하기`,
    sub: `뭉치 POS로 우리 매장의 고객 현황과 재고 현황 등
매장에 대한 모든 내용을 파악하고 분석할 수 있습니
다`,
    image: "",
  },
  {
    tag: "분석하기",
    title: `뭉치 POS로
우리 매장 분석하기`,
    sub: `뭉치 POS로 우리 매장의 고객 현황과 재고 현황 등
매장에 대한 모든 내용을 파악하고 분석할 수 있습니
다`,
    image: "",
  },
  {
    tag: "분석하기",
    title: `뭉치 POS로
우리 매장 분석하기`,
    sub: `뭉치 POS로 우리 매장의 고객 현황과 재고 현황 등
매장에 대한 모든 내용을 파악하고 분석할 수 있습니
다`,
    image: "",
  },
];

const Wrapper = styled.section`
  padding-top: 254px;
  & > .container {
    display: grid;
    grid-template-columns: repeat(3, 321px);
    column-gap: 15px;
    row-gap: 39px;
    & > .card {
      width: 100%;
      height: 408px;
      border-radius: 10px;
      background-color: white;
      padding: 25px 23px 22.3px 23px;
      box-sizing: border-box;
      & > .tag {
        font-size: 13px;
        font-weight: bold;
        color: #007fff;
      }
      & > .title {
        font-size: 22px;
        font-weight: bold;
        color: #191f28;
        line-height: 1.36;
        white-space: pre-wrap;
        margin-top: 6px;
        margin-bottom: 8px;
      }
      & > .sub {
        white-space: pre-wrap;
        font-size: 13px;
        line-height: 1.54;
        color: #191f28;
      }
      & > .image {
        cursor: pointer;
        margin-top: 24px;
        width: 100%;
        height: 181.6px;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        & > figure {
          width: 56px;
          height: 56px;
        }
      }
    }
  }
`;
function List() {
  return (
    <Wrapper>
      <div className="container">
        {dummy.map(({ tag, title, sub, image }, idx) => {
          return (
            <div key={idx} className="card">
              <div className="tag">{tag}</div>
              <div className="title">{title}</div>
              <div className="sub">{sub}</div>
              <div className="image">
                <figure>
                  <img src="/assets/look/play.svg" alt="" />
                </figure>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

export default List;
