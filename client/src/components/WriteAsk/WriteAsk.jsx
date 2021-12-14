import React from "react";
import styled from "styled-components";
import Loading from "../common/Loading";
import Infoinsert from "./components/Infoinsert";
import InitBtn from "./components/InitBtn";
import Template from "./components/Template";

const arr = [
  {
    title: "게시글 제목",
    type: "title",
    placeholder: "제목을 입력해주세요",
    patcher: "@layouts/ASK_TITLE",
  },
  {
    title: "이름",
    type: "name",
    placeholder: "",
    patcher: "@layouts/ASK_NAME",
  },
  {
    title: "비밀번호",
    type: "password",
    placeholder: "4자리 숫자 입력",
    patcher: "@layouts/ASK_PASSWORD",
  },
  {
    title: "연락처",
    type: "tel",
    placeholder: "숫자만 입력",
    patcher: "@layouts/ASK_TEL",
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
          <InitBtn />
        </div>
        <div className="info-wrapper">
          {arr.map(({ type, title, placeholder, patcher }, idx) => {
            return (
              <Infoinsert
                key={idx}
                type={type}
                title={title}
                placeholder={placeholder}
                patcher={patcher}
              />
            );
          })}
        </div>
        <Template />
      </div>
      <Loading />
    </Wrapper>
  );
}

export default WriteAsk;
