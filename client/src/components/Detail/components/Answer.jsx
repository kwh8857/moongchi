import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  padding: 22px 28px 65px 28px;
  box-sizing: border-box;
  background-color: #f7f8fa;
  border-radius: 10px;
  & > .title-wrapper {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 22px;
    & > figure {
      margin-right: 11.5px;
    }
  }
  & > .content {
    font-size: 17px;
    color: #443b31;
    line-height: 2.06;
  }
  & > figure {
    margin-top: 44px;
  }
`;
function Answer({ data }) {
  return (
    <Wrapper>
      <div className="title-wrapper">
        <figure>
          <img src="/assets/detail/blue-arrow.svg" alt="" />
        </figure>
        <div>관리자 답변</div>
      </div>
      <div className="content">{data.content}</div>
      <figure>
        <img src={data.image.url} alt="" />
      </figure>
    </Wrapper>
  );
}

export default Answer;
