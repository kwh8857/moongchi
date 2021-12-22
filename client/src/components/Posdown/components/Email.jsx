import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import firebaseApp from "../../config/firebaseApp";
var re =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const Fauth = firebaseApp.auth();
const Fstore = firebaseApp.firestore();
const Wrapper = styled.section`
  width: 860px;
  height: 350px;
  border-radius: 20px;
  box-shadow: 0 3px 20px 0 rgba(69, 71, 101, 0.06);
  background-color: white;
  padding-top: 37px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .title {
    font-size: 20px;
    font-weight: bold;
    color: #191f28;
  }
  & > .sub {
    margin-top: 11px;
    margin-bottom: 21px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.54;
    color: #191f28;
  }
  & > .input-wrapper {
    display: flex;
    align-items: center;
    width: 544px;
    height: 54px;
    border: solid 1px #dbdbdb;
    border-radius: 10px;
    padding: 0 14.8px;
    box-sizing: border-box;
    & > .left {
      display: flex;
      align-items: center;
      & > .tag {
        font-size: 16px;
        font-weight: bold;
        color: #434343;
        margin-left: 10.3px;
        white-space: nowrap;
      }
    }
    & > input {
      flex: 1;
      margin-left: 15px;
      font-size: 16px;
      background-color: transparent;
    }
  }
  & > .success-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .title {
      font-size: 20px;
      font-weight: bold;
      line-height: 1.45;
      color: #191f28;
    }
    & > figure {
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      border-radius: 10px;
      box-shadow: 0 3px 15px 0 rgba(69, 71, 101, 0.16);
      & > img {
        width: 70.7px;
        height: 74.3px;
      }
    }
    & > button {
      margin-top: 31px;
      display: flex;
      width: 249px;
      height: 54px;
      border-radius: 57px;
      background-color: #007fff;
      align-items: center;
      padding-left: 23.3px;
      box-sizing: border-box;
      font-size: 18px;
      font-weight: bold;
      color: white;
      cursor: pointer;
      & > figure {
        width: 18px;
        margin-right: 11.3px;
      }
    }
  }
  ${(props) => {
    return css`
      & > .input-wrapper {
        background-color: ${props.isClear ? "#f7f8fa" : "transparent"};
      }
      & > button {
        background-color: ${props.isClear ? "#337dff" : "#dbdbdb"};
      }
    `;
  }}
  & > button {
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
    margin-top: 59px;
    width: 249px;
    height: 54px;
    border-radius: 57px;
    display: flex;
    align-items: center;
    padding-left: 21px;
    padding-right: 19.7px;
    box-sizing: border-box;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    color: white;
  }
  @media screen and (max-width: 1024px) {
    width: 704px;
  }
  @media screen and (max-width: 769px) {
    width: 320px;
    padding-top: 34px;
    & > .title {
      font-size: 18px;
    }
    & > .sub {
      margin-top: 8px;
      margin-bottom: 28px;
    }
    & > .input-wrapper {
      width: 279px;
      height: 50px;
      & > .left {
        & > figure {
          width: 19px;
          height: 15.2px;
          & > svg {
            width: 100%;
            height: 100%;
          }
        }
        & > .tag {
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
    & > button {
      width: 209px;
      height: 46px;
      font-size: 15px;
      margin-top: 62px;
      padding-left: 18px;
      padding-right: 19px;
      & > figure {
        & > img {
          width: 25.4px;
          height: 15.2px;
        }
      }
    }
  }
`;

function Email({ useragent }) {
  const location = useLocation();
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const [isClear, setIsClear] = useState(false);
  const [success, setsuccess] = useState(false);
  const __check = useCallback((email) => {
    if (re.test(email)) {
      setIsClear(true);
    } else {
      setIsClear(false);
    }
  }, []);
  const __sendEmail = useCallback(() => {
    Fstore.collection("download")
      .where("email", "==", emailRef.current.value)
      .get()
      .then((res) => {
        if (res.empty) {
          Fauth.sendSignInLinkToEmail(emailRef.current.value, {
            url: `http://localhost:3000/down?${emailRef.current.value}?`,
            handleCodeInApp: true,
          }).then(() => {
            console.log("인증완료");
          });
          dispatch({
            type: "POPUP",
            payload: {
              ispos: true,
              type: "pos",
            },
          });
        } else {
          setsuccess(true);
        }
      });
  }, [dispatch, emailRef]);
  useEffect(() => {
    const check = location.search.split("?")[1];
    if (check) {
      console.log("발동");
      Fstore.collection("download")
        .where("email", "==", check)
        .get()
        .then((res) => {
          if (res.empty) {
            Fstore.collection("download")
              .add({
                email: check,
                timestamp: Date.now(),
              })
              .then(() => {
                setsuccess(true);
              });
          } else {
            setsuccess(true);
          }
        });
    }
    return () => {};
  }, [location.search]);
  return (
    <Wrapper isClear={isClear}>
      {success ? (
        <>
          <div className="success-wrapper">
            <div className="title">
              이메일 인증이 완료되었습니다 <br /> 프로그램을 다운로드하세요
            </div>
            <figure>
              <img src="/assets/down/logo.svg" alt="" />
            </figure>
            <button>
              <figure>
                <img src="/assets/header/download.svg" alt="" />
              </figure>
              <div>뭉치 프로그램 다운로드</div>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="title">이메일 인증 후 다운로드</div>
          <div className="sub">
            메일을 입력 후 [인증메일 요청]을 클릭하시면 작성해
            {useragent === "mobile" ? <br /> : undefined}주신 메일로 인증 메일이
            발송됩니다. {useragent !== "mobile" ? <br /> : undefined}메일 인증을
            마{useragent === "mobile" ? <br /> : undefined}무리하시면 다운로드
            링크가 오픈됩니다 ☺️
          </div>
          <div className="input-wrapper">
            <div className="left">
              <figure>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26.905"
                  height="21.524"
                  viewBox="0 0 26.905 21.524"
                >
                  <path
                    d="M27.214 6H5.69a2.687 2.687 0 0 0-2.677 2.69L3 24.833a2.7 2.7 0 0 0 2.69 2.69h21.524a2.7 2.7 0 0 0 2.69-2.69V8.69A2.7 2.7 0 0 0 27.214 6zm0 5.381-10.762 6.726L5.69 11.381V8.69l10.762 6.726L27.214 8.69z"
                    transform="translate(-3 -6)"
                    style={{ fill: isClear ? "#007fff" : "#dbdbdb" }}
                  />
                </svg>
              </figure>
              <div className="tag">이메일</div>
            </div>
            <input
              type="text"
              ref={emailRef}
              placeholder="moongchi@naver.com"
              onChange={(e) => {
                __check(e.target.value);
              }}
            />
          </div>
          <button onClick={__sendEmail}>
            <div className="title">인증메일 요청</div>
            <figure>
              <img src="/assets/main/arrow.svg" alt="" />
            </figure>
          </button>
        </>
      )}
    </Wrapper>
  );
}

export default Email;
