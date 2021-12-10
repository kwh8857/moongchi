import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
var re =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
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
      }
    }
    & > input {
      flex: 1;
      margin-left: 15px;
      font-size: 16px;
      background-color: transparent;
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
`;

function Email() {
  const dispatch = useDispatch();
  const [isClear, setIsClear] = useState(false);
  const __check = useCallback((email) => {
    if (re.test(email)) {
      setIsClear(true);
    } else {
      setIsClear(false);
    }
  }, []);
  const __sendEmail = useCallback(() => {
    dispatch({
      type: "POPUP",
      payload: {
        ispos: true,
        type: "pos",
      },
    });
  }, [dispatch]);
  return (
    <Wrapper isClear={isClear}>
      <div className="title">이메일 인증 후 다운로드</div>
      <div className="sub">
        메일을 입력 후 [인증메일 요청]을 클릭하시면 작성해주신 메일로 인증
        메일이 발송됩니다. <br /> 메일 인증을 마무리하시면 다운로드 링크가
        오픈됩니다 ☺️
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
    </Wrapper>
  );
}

export default Email;
