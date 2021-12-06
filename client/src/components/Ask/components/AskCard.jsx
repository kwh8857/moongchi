import React from "react";
import styled, { css } from "styled-components";

const Card = styled.div`
  border-top: solid 1px #dbdbdb;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  padding-right: 20px;
  & > .left {
    display: flex;
    align-items: center;
    & > .number {
      font-size: 15px;
      font-weight: bold;
      color: #007fff;
      width: 10px;
      margin-right: 18px;
    }
    & > .status {
      width: 69px;
      height: 30px;
      border-radius: 57px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 11px;
      font-weight: bold;
      margin-right: 31px;
    }
    & > .title {
      font-size: 15px;
      font-weight: 500;
    }
    & > figure {
      width: 24px;
      height: 24px;
      margin-left: 8px;
      transform: translateY(-2px);
    }
  }
  & > .time {
    font-size: 13px;
    font-weight: bold;
    color: #989898;
  }
  ${(props) => {
    return css`
      & > .left {
        & > .status {
          background-color: ${props.status ? "rgb(221,238,255)" : "#f7f8fa "};
          color: ${props.status ? "#007fff" : "#a8a8a8"};
        }
      }
    `;
  }}
`;
function AskCard({
  data: { status, title, name, password, tel, timestamp, templates },
  index,
}) {
  return (
    <Card status={status}>
      <div className="left">
        <div className="number">{index}</div>
        <div className="status">{status ? "답변완료" : "미답변"}</div>
        <div className="title">{title}</div>
        <figure>
          <img src="/assets/ask/lock.svg" alt="" />
        </figure>
      </div>
      <div className="time">2021.1.20</div>
    </Card>
  );
}

export default AskCard;
