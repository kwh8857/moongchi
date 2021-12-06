import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const arr = [
  { title: "미리보기", to: "/look" },
  { title: "고객문의", to: "/ask" },
  { title: "공지사항", to: "/notice" },
  { title: "블로그", to: "/" },
];

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 74px;
  box-sizing: border-box;
  & > figure {
    cursor: pointer;
    width: 158.6px;
    height: 39.5px;
  }
  & > .right {
    display: flex;
    align-items: center;
    & > nav {
      margin-right: 51px;
      display: grid;
      grid-template-columns: repeat(4, auto);
      column-gap: 50px;
      & > a {
        font-size: 13px;
      }
    }
    & > button {
      cursor: pointer;
      display: flex;
      width: 193px;
      height: 38px;
      border-radius: 50px;
      background-color: #007fff;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      & > figure {
        width: 13px;
        height: 15.7px;
        margin-right: 8.3px;
      }
    }
  }
`;
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <figure
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/assets/header/logo.svg" alt="moogchi" />
      </figure>
      <div className="right">
        <nav>
          {arr.map(({ title, to }, idx) => {
            return (
              <Link
                to={to}
                key={idx}
                style={
                  location.pathname === to
                    ? {
                        color: "#007fff",
                        fontWeight: "bold",
                      }
                    : undefined
                }
              >
                {title}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => {
            navigate("down");
          }}
        >
          <figure>
            <img src="/assets/header/download.svg" alt="" />
          </figure>
          <span>뭉치 POS 무료 다운로드</span>
        </button>
      </div>
    </Wrapper>
  );
}

export default Header;
