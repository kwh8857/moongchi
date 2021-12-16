import React from "react";
import styled from "styled-components";

const layout = [
  {
    title: "카테고리",
    type: "category",
    placeholder: "카테고리 입력",
  },
  {
    title: "제목",
    sub: "2줄 권장 / 개행 가능",
    type: "title",
    placeholder: "제목을 입력해주세요",
  },
  {
    title: "내용",
    sub: "3줄 권장 / 개행 가능",
    type: "content",
    placeholder: "내용을 입력해주세요",
  },
  {
    title: "링크",
    type: "link",
    placeholder: "링크 입력",
  },
];

const Card = styled.div`
  width: 100%;
  height: 532px;
  border-radius: 10px;
  border: solid 1px #dbdbdb;
  background-color: white;
`;

function LookCard({ index }) {
  return (
    <Card>
      <div className="title">미리보기{index}</div>
      <div className="insert-wrapper">
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </Card>
  );
}

export default LookCard;
