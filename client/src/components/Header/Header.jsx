import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const arr = [
  { title: "미리보기", to: "/look" },
  { title: "고객문의", to: "/ask" },
  { title: "공지사항", to: "/notice" },
  { title: "블로그", to: "/blog" },
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
  z-index: 9000;
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
    .posdown {
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
  @media screen and (max-width: 1024px) {
    padding: 0 32px;
    & > .right {
      & > figure {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        & > img {
          width: 28px;
          height: 28px;
          cursor: pointer;
        }
      }
      .posdown {
        width: 233px;
        height: 45px;
        font-size: 16px;
        & > figure {
          width: 15.7px;
          height: 18.9px;
          margin-right: 9.4px;
        }
      }
      & > .mb-menu {
        z-index: -1;
        transition: top 0.3s ease-in-out;
        padding-top: 39px;
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        left: 0;
        height: 357px;
        background-color: white;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > .nav-wrapper {
          margin-bottom: 35px;
          display: grid;
          row-gap: 30px;
          text-align: center;
          & > a {
            font-size: 19px;
            font-weight: bold;
          }
        }
      }
    }
    ${(props) => {
      return css`
        & > .right {
          & > .mb-menu {
            top: ${props.isOpen ? "64px" : "-500px"};
          }
        }
      `;
    }}
  }
`;
function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const ObRef = useRef(null);
  const useragent = useSelector((state) => state.config.useragent);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.getElementById("root").scrollTo(0, 0);
    if (useragent !== "desktop") {
      setIsOpen(false);
    }
    return () => {};
  }, [location, useragent]);
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      const node = entries[0].target;
      const browserWidth = node.offsetWidth;
      if (browserWidth <= 768) {
        dispatch({
          type: "USERAGENT",
          payload: "mobile",
        });
      } else if (browserWidth <= 1024) {
        dispatch({
          type: "USERAGENT",
          payload: "tablet",
        });
      } else {
        dispatch({
          type: "USERAGENT",
          payload: "desktop",
        });
      }
    });
    ro.observe(ObRef.current);
    return ro.disconnect;
  }, [ObRef, dispatch]);

  return (
    <Wrapper ref={ObRef} isOpen={isOpen} className="HeaderWrapper">
      <figure
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/assets/header/logo.svg" alt="moogchi" />
      </figure>
      <div className="right">
        {useragent === "desktop" ? (
          <>
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
              className="posdown"
              onClick={() => {
                navigate("down");
              }}
            >
              <figure>
                <img src="/assets/header/download.svg" alt="" />
              </figure>
              <span>뭉치 POS 무료 다운로드</span>
            </button>
          </>
        ) : (
          <>
            <figure
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img
                src={`/assets/header/${isOpen ? "cancel" : "menu"}.svg`}
                alt=""
              />
            </figure>
            <nav className="mb-menu">
              <div className="nav-wrapper">
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
              </div>
              <button
                className="posdown"
                onClick={() => {
                  navigate("down");
                }}
              >
                <figure>
                  <img src="/assets/header/download.svg" alt="" />
                </figure>
                <span>뭉치 POS 무료 다운로드</span>
              </button>
            </nav>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default Header;
