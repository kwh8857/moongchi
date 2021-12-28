import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import firebaseApp from "../config/firebaseApp";

const Fauth = firebaseApp.auth();

const Wrapper = styled.div`
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    & > .top {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #434343;
      & > div {
        margin-top: 9.9px;
      }
      & > img {
        width: 197.7px;
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      .input-wrapper {
        display: grid;
        grid-template-columns: 341px;
        row-gap: 13px;
        margin-top: 29px;
        margin-bottom: 23px;
        input {
          width: 100%;
          height: 44px;
          border-radius: 6px;
          padding-left: 13px;
          font-size: 15px;
          box-sizing: border-box;
        }
        input:-webkit-autofill::first-line {
          font-size: 15px;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          transition: background-color 5000s ease-in-out 0s;
        }
        input::placeholder {
          font-size: 15px;
          color: #a8a8a8;
          font-weight: 500;
        }
      }
      .btn {
        width: 341px;
        height: 52px;
        border-radius: 6px;
        display: flex;
        color: white;
        align-items: center;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        justify-content: center;
        background-color: #007fff;
      }
    }
  }
  /* ${(props) => {
    return css`
      & > .box {
        & > .bottom {
          & > .btn {
            background-color: ${props.isactive ? "#007fff" : "#dbdbdb"};
          }
        }
      }
    `;
  }} */
`;
function Login() {
  const dispatch = useDispatch();
  const IdRef = useRef(null);
  const PasswordRef = useRef(null);
  const __login = useCallback(() => {
    Fauth.setPersistence(firebaseApp.auth.Auth.Persistence.SESSION).then(() => {
      return Fauth.signInWithEmailAndPassword(
        `${IdRef.current.value}@moogchi.com`,
        PasswordRef.current.value
      )
        .then((result) => {
          const {
            user: { uid },
          } = result;
          if (uid === "I9JFP3oIyAX1w8veQzg74231M5R2") {
            dispatch({
              type: "@config/isLogin",
              payload: true,
            });
          } else {
            dispatch({
              type: "@config/TOAST",
              payload: {
                isactive: true,
                msg: "등록된 관리자가 아닙니다 접근에 주의하세요",
              },
            });
          }
        })
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            dispatch({
              type: "@config/TOAST",
              payload: {
                isactive: true,
                msg: "존재하지않는 유저이거나 잘못된 이메일입니다",
              },
            });
          } else if (err.code === "auth/wrong-password") {
            dispatch({
              type: "@config/TOAST",
              payload: {
                isactive: true,
                msg: "비밀번호가 맞지않습니다",
              },
            });
          }
        });
    });
  }, [IdRef, PasswordRef, dispatch]);
  return (
    <Wrapper>
      <Body>
        <div className="box">
          <div className="top">
            <img src="/assets/logo-white.svg" alt="Aju" />
            <div>뭉치 관리자페이지</div>
          </div>
          <div className="bottom">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="아이디를 입력해주세요"
                ref={IdRef}
              />
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                ref={PasswordRef}
              />
            </div>
            <div className="btn" onClick={__login}>
              로그인하기
            </div>
          </div>
        </div>
      </Body>
    </Wrapper>
  );
}

export default Login;
