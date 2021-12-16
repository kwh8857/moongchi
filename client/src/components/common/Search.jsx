import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.section`
  & > .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .left {
      display: flex;
      align-items: center;
      & > .title {
        font-size: 40px;
        font-weight: bold;
      }
      & > button {
        cursor: pointer;
        margin-left: 20px;
        width: 131px;
        height: 44px;
        border-radius: 57px;
        background-color: #337dff;
        font-size: 16px;
        font-weight: bold;
        color: white;
      }
    }
    & > .right {
      display: flex;
      border: solid 1px #dbdbdb;
      width: 320px;
      height: 50px;
      border-radius: 10px;
      overflow: hidden;
      align-items: center;
      padding-left: 15.7px;
      padding-right: 17.7px;
      box-sizing: border-box;
      & > input {
        flex: 1;
        font-size: 15px;
        font-weight: 500;
        margin-right: 10px;
      }
    }
  }
`;

function Search({ type, searching }) {
  const navigate = useNavigate();
  const navAsk = useCallback(() => {
    navigate("/write");
  }, [navigate]);
  return (
    <Wrapper>
      <div className="container">
        <div className="left">
          <div className="title">
            {type === "ask"
              ? "고객문의"
              : type === "notice"
              ? "공지사항"
              : "블로그"}
          </div>
          {type === "ask" ? (
            <button onClick={navAsk}>문의글 작성</button>
          ) : undefined}
        </div>
        <div className="right">
          <input
            autoComplete="off"
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={searching}
          />
          <figure>
            <img src="/assets/common/search.svg" alt="검색" />
          </figure>
        </div>
      </div>
    </Wrapper>
  );
}

export default Search;
