import React, { useCallback } from "react";
import { useState } from "react";
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
  overflow: hidden;
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
      width: 300px;
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
      white-space: nowrap;
    }
    & > .tel {
      margin-right: 45px;
    }
    & > .button-wrapper {
      margin-left: 20px;
      display: grid;
      grid-template-columns: repeat(2, 88px);
      column-gap: 13px;
      & > button {
        cursor: pointer;
        width: 100%;
        height: 37px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
      }
      & > .remove {
        background-color: #e3f1ff;
        color: #007fff;
      }
    }
  }
  & > .setup {
    position: absolute;
    top: 0;
    width: 420px;
    height: 65px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: bold;
    box-sizing: border-box;
    padding-left: 18.3px;
    padding-right: 23.2px;
    justify-content: space-between;
    color: #007fff;
    & > .left {
      display: flex;
      align-items: center;
      & > figure {
        cursor: pointer;
        margin-right: 11.5px;
        width: 13.2px;
        height: 16px;
      }
    }
    & > button {
      cursor: pointer;
      width: 72px;
      height: 27px;
      border-radius: 14px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
      color: #007fff;
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
      & > .setup {
        right: ${props.on ? "0" : "-430px"};
        transition: right 0.2s ease-in-out;
        background-color: #e3f1ff;
      }
    `;
  }}
`;
function QuestionCard({ data, remove }) {
  const { title, timestamp, tel, status, name, index, key, template, answer } =
    data;
  const navigate = useHistory();
  const [isOn, setIsOn] = useState(undefined);

  const __nav = useCallback(() => {
    navigate.push("/answer", { data });
  }, [data, navigate]);
  return (
    <Wrapper status={status} on={isOn}>
      <div className="left">
        <div className="index">{index + 1}</div>
        <div className="status">{status ? "답변완료" : "미답변"}</div>
        <div className="title">{title}</div>
      </div>
      <div className="right">
        <div className="name">{name}</div>
        <div className="tel">{tel}</div>
        <div className="time">{formatDate(timestamp, ".")}</div>
        <div className="button-wrapper">
          <button onClick={__nav}>{status ? "답변수정" : "답변하기"}</button>
          <button
            className="remove"
            onClick={() => {
              setIsOn("remove");
            }}
          >
            삭제하기
          </button>
        </div>
      </div>
      <div className="setup">
        <div
          className="left"
          onClick={() => {
            setIsOn(undefined);
          }}
        >
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.061"
              height="13.061"
              viewBox="0 0 13.061 13.061"
              style={{
                fill: "none",
                stroke: "#007fff",
                strokeWidth: "1.5px",
              }}
            >
              <g id="X" transform="translate(.53 .53)">
                <path
                  id="선_68"
                  data-name="선 68"
                  className="cls-1"
                  d="m0 0 12 12"
                />
                <path
                  id="선_69"
                  data-name="선 69"
                  className="cls-1"
                  d="M12 0 0 12"
                />
              </g>
            </svg>
          </figure>
          <div className="title">해당 게시글을 삭제하시겠습니까?</div>
        </div>
        <button
          onClick={() => {
            setIsOn(undefined);
            remove(key, template, answer);
          }}
        >
          삭제
        </button>
      </div>
    </Wrapper>
  );
}

export default QuestionCard;
