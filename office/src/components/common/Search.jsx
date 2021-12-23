import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .title {
    font-size: 30px;
    font-weight: bold;
  }
  & > .right {
    transform: translateY(10px);
    display: flex;
    & > .filter {
      margin-right: 27px;
      display: flex;
      align-items: center;
      & > button {
        cursor: pointer;
        width: 25px;
        height: 25px;
        border: solid 1px #dbdbdb;
        background-color: white;
        border-radius: 25px;
        margin-right: 8px;
      }
      & > div {
        font-size: 15px;
        font-weight: bold;
      }
    }
    & > .btn-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 153px);
      column-gap: 17px;
      & > button {
        cursor: pointer;
        width: 100%;
        height: 44px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
      }
      & > .first {
        color: #434343;
        background-color: #dbdbdb;
      }
      & > .two {
        background-color: #007fff;
        color: white;
      }
      & > .insert {
        display: flex;
        align-items: center;
        background-color: white;
        box-sizing: border-box;
        padding-left: 30px;
        & > figure {
          margin-right: 7px;
          height: 21px;
          & > img {
            width: 19px;
          }
        }
      }
    }
    .input-wrapper {
      background-color: white;
      width: 215px;
      height: 44px;
      border: solid 1px #dbdbdb;
      border-radius: 5px;
      display: flex;
      overflow: hidden;
      padding-left: 13px;
      padding-right: 16px;
      box-sizing: border-box;
      img {
        width: 21px;
        cursor: pointer;
      }
      input {
        margin-right: 10px;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-weight: 500;
      }
      input::placeholder {
        font-size: 16px;
        font-weight: 500;
        color: #a8a8a8;
      }
    }
  }
  ${(props) => {
    return css`
      & > .right {
        & > .filter {
          & > div {
            color: ${props.isfilter ? "#007fff" : "#434343"};
          }
        }
        & > .btn-wrapper {
          grid-template-columns: ${props.type === "look"
            ? "repeat(3,153px)"
            : "repeat(2,153px)"};
        }
      }
    `;
  }}
`;

function Search({
  title,
  type,
  placeholder,
  searching,
  change,
  isfilter,
  upload,
  add,
  preview,
}) {
  return (
    <Wrapper isfilter={isfilter} type={type}>
      <div className="title">{title}</div>
      <div className="right">
        {type === "question" ? (
          <div className="filter">
            <button onClick={change}>
              {isfilter ? (
                <img src="/assets/question/blue-check.svg" alt="" />
              ) : undefined}
            </button>
            <div>미답변 모아보기</div>
          </div>
        ) : undefined}
        {type === "look" ? (
          <div className="btn-wrapper">
            <button onClick={add} className="insert">
              <figure>
                <img src="/assets/common/insert.svg" alt="" />
              </figure>
              추가하기
            </button>
            <button
              className="first"
              onClick={() => {
                preview(true);
              }}
            >
              미리보기
            </button>
            <button className="two" onClick={upload}>
              저장히기
            </button>
          </div>
        ) : (
          <div className="input-wrapper">
            <input
              type="text"
              placeholder={placeholder}
              onChange={(e) => {
                const val = e.target.value;
                searching(val);
              }}
            />
            <img src="/assets/grey-search.svg" alt="검색" />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default Search;
