import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  height: 64px;
  border-bottom: solid 1px #dbdbdb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 75px;
  padding-right: 115px;
  box-sizing: border-box;
  background-color: white;
  z-index: 1000;
  & > a {
    display: flex;
    align-items: center;
    & > img {
      width: 180px;
      cursor: pointer;
    }
    & > div {
      font-size: 13px;
      font-weight: bold;
      color: #007fff;
      margin-left: 8.4px;
    }
  }
  .right {
    display: grid;
    grid-template-columns: repeat(6, auto);
    column-gap: 50px;
    & > a {
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
    }
  }
`;
function Header() {
  const location = useLocation();
  return (
    <Wrapper>
      <Link to="/download">
        <img src="/assets/logo.svg" alt="logo" />
        <div>ADMIN</div>
      </Link>
      {location.pathname !== "/" ? (
        <div className="right">
          <Link to="/download">다운로드관리</Link>
          <Link to="/main">고객문의관리</Link>
          <Link to="/look">미리보기관리</Link>
          <Link to="/notice">공지사항관리</Link>
          <Link to="/notice">블로그 관리</Link>
          <Link to="/notice">팝업 관리</Link>
        </div>
      ) : undefined}
    </Wrapper>
  );
}

export default Header;
