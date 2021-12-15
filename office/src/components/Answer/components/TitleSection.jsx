import React from "react";
import styled from "styled-components";
import { formatDate } from "../../lib/factory";

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 25px;
  border-bottom: solid 1px #bfbfbf;
  & > .type {
    font-size: 15px;
    font-weight: bold;
    color: #007fff;
  }
  & > .title {
    margin-top: 8px;
    font-size: 33px;
    font-weight: bold;
    margin-bottom: 19px;
  }
  & > .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    color: #7c7c7c;
    & > .right {
      display: grid;
      row-gap: 7px;
      & > .info {
        display: flex;
        align-items: center;
        & > .tag {
          width: 39px;
          margin-right: 14px;
          font-weight: bold;
        }
      }
    }
  }
`;

function TitleSection({ title, timestamp, name, tel }) {
  return (
    <Wrapper>
      <div className="type">고객문의</div>
      <div className="title">{title}</div>
      <div className="bottom">
        <div className="timestamp">{formatDate(timestamp, ".")}</div>
        <div className="right">
          <div className="info">
            <div className="tag">이름</div>
            <div>{name}</div>
          </div>
          <div className="info">
            <div className="tag">연락처</div>
            <div>{tel}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default TitleSection;
