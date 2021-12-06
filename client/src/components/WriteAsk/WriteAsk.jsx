import React from "react";
import styled from "styled-components";
import Infoinsert from "./components/Infoinsert";

const arr = [
  {
    title: "게시글 제목",
    type: "title",
    placeholder: "제목을 입력해주세요",
  },
  {
    title: "이름",
    type: "name",
    placeholder: "",
  },
  {
    title: "비밀번호",
    type: "password",
    placeholder: "4자리 숫자 입력",
  },
  {
    title: "연락처",
    type: "tel",
    placeholder: "숫자만 입력",
  },
];

const Wrapper = styled.main`
  width: 100%;
  min-height: 1483px;
  padding-top: 117px;
  & > .container {
    & > .title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > .title {
        font-size: 40px;
        font-weight: bold;
      }
      & > button {
        cursor: pointer;
        width: 148px;
        height: 50px;
        border-radius: 50px;
        background-color: #dbdbdb;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 19px;
        font-weight: bold;
      }
    }
    & > .info-wrapper {
      margin-top: 55px;
      display: grid;
      row-gap: 17px;
    }
  }
`;
function WriteAsk() {
  return (
    <Wrapper>
      <div className="container">
        <div className="title-wrapper">
          <div className="title">문의하기</div>
          <button>등록</button>
        </div>
        <div className="info-wrapper">
          {arr.map(({ type, title, placeholder }, idx) => {
            return (
              <Infoinsert
                key={idx}
                type={type}
                title={title}
                placeholder={placeholder}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default WriteAsk;
