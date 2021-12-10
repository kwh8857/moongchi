import React from "react";
import styled from "styled-components";

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
`;

function Search({ title, type, placeholder, searching }) {
  return (
    <Wrapper>
      <div className="title">{title}</div>{" "}
      <div className="right">
        {type === "look" ? (
          <div className="btn-wrapper">
            <button className="first">미리보기</button>
            <button className="two">저장히기</button>
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
