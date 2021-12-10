import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
        background-color: #007fff;
        display: flex;
        color: white;
        align-items: center;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        justify-content: center;
      }
    }
  }
`;
function Login() {
  const history = useHistory();
  const Nav = useCallback(() => {
    history.push("/download");
  }, [history]);
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
              <input type="text" placeholder="아이디를 입력해주세요" />
              <input type="password" placeholder="비밀번호를 입력해주세요" />
            </div>
            <div className="btn" onClick={Nav}>
              로그인하기
            </div>
          </div>
        </div>
      </Body>
    </Wrapper>
  );
}

export default Login;
