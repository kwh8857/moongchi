import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { formatDate } from "../../lib/factory";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  & > .left {
    display: flex;
    align-items: center;
    & > .index {
      width: 74px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      color: #007fff;
    }
    & > .status {
      width: 69px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 57px;
      font-size: 11px;
      font-weight: bold;
    }
    & > .title {
      white-space: nowrap;
      font-size: 16px;
      font-weight: bold;
      margin-left: 24px;
      width: 380px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  & > .right {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    color: #989898;
    & > .name {
      width: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 55px;
    }
    & > .tel {
      margin-right: 45px;
    }
    & > button {
      cursor: pointer;
      position: absolute;
      right: 13px;
      width: 88px;
      height: 37px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: bold;
    }
  }

  ${(props) => {
    return css`
      & > .left {
        & > .status {
          background-color: ${props.status ? "rgb(221,238,255)" : "#f7f8fa"};
          color: ${props.status ? "#007fff" : "#a8a8a8"};
        }
      }
      & > .right {
        & > button {
          color: ${props.status ? "#434343" : "white"};
          background-color: ${props.status ? "#dbdbdb" : "#007fff"};
        }
      }
    `;
  }}
`;
function QuestionCard({ data }) {
  const { title, timestamp, tel, status, name, index } = data;
  const navigate = useHistory();
  const __nav = useCallback(() => {
    navigate.push("/answer", { data });
  }, [data, navigate]);
  return (
    <Wrapper status={status}>
      <div className="left">
        <div className="index">{index + 1}</div>
        <div className="status">{status ? "답변완료" : "미답변"}</div>
        <div className="title">{title}</div>
      </div>
      <div className="right">
        <div className="name">{name}</div>
        <div className="tel">{tel}</div>
        <div className="time">{formatDate(timestamp, ".")}</div>
        <button onClick={__nav}>{status ? "답변수정" : "답변하기"}</button>
      </div>
    </Wrapper>
  );
}

export default QuestionCard;
