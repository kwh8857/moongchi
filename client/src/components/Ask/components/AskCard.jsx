import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { formatDate } from "../../lib/factory";

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
      display: flex;
      align-items: center;
      font-size: 15px;
      font-weight: 500;
      & > div {
        max-width: 700px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & > figure {
        width: 24px;
        height: 24px;
        margin-left: 8px;
        transform: translateY(-2px);
      }
    }
  }
  & > .right {
    font-size: 13px;
    font-weight: bold;
    color: #989898;
  }
  @media screen and (max-width: 1024px) {
    height: 98.5px;
    padding: 0 32px;
    & > .left {
      flex-direction: column;
      align-items: flex-start;
      & > .number {
        font-size: 14px;
        width: fit-content;
        margin-right: unset;
      }
      & > .timestamp {
        margin-top: 5px;
        font-size: 13px;
        font-weight: bold;
        color: #989898;
      }
      & > .title {
        & > div {
          max-width: 530px;
        }
      }
    }
    & > .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 69px;
      height: 30px;
      border-radius: 57px;
    }
    @media screen and (max-width: 769px) {
      & > .left {
        & > .title {
          & > div {
            max-width: 190px;
          }
        }
      }
    }
  }
  ${(props) => {
    return css`
      & > .left {
        & > .status {
          background-color: ${props.status ? "rgb(221,238,255)" : "#f7f8fa "};
          color: ${props.status ? "#007fff" : "#a8a8a8"};
        }
      }

      @media screen and (max-width: 1024px) {
        & > .right {
          background-color: ${props.status ? "rgb(221,238,255)" : "#f7f8fa"};
          color: ${props.status ? "#007fff" : "#a8a8a8"};
        }
      }
    `;
  }}
`;
function AskCard({ data: { status, title, password, key, timestamp }, index }) {
  const dispatch = useDispatch();
  const useragent = useSelector((state) => state.config.useragent);
  const __openPassword = useCallback(() => {
    dispatch({
      type: "POPUP",
      payload: {
        ispos: true,
        type: "password",
        id: key,
        password: password,
      },
    });
  }, [password, key]);

  return (
    <Card
      status={status}
      onClick={() => {
        __openPassword();
      }}
    >
      <div className="left">
        <div className="number">{index}</div>
        {useragent === "desktop" ? (
          <div className="status">{status ? "답변완료" : "미답변"}</div>
        ) : undefined}
        <div className="title">
          <div>{title}</div>
          <figure>
            <img src="/assets/ask/lock.svg" alt="" />
          </figure>
        </div>
        {useragent !== "desktop" ? (
          <div className="timestamp">{formatDate(timestamp, ".")}</div>
        ) : undefined}
      </div>
      <div className="right">
        {useragent === "desktop"
          ? formatDate(timestamp, ".")
          : status
          ? "답변완료"
          : "미답변"}
      </div>
    </Card>
  );
}

export default AskCard;
