import React, { useState } from "react";
import styled from "styled-components";
import { formatDate } from "../lib/factory";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 65px;
  width: 100%;
  background-color: white;
  justify-content: space-between;
  padding-right: 12px;
  box-sizing: border-box;
  & > .left {
    display: flex;
    align-items: center;
    font-size: 16px;
    & > .index {
      width: 76px;
      font-weight: bold;
      color: #007fff;
      text-align: center;
    }
    & > .title {
      font-weight: bold;
    }
    & > .badge {
      align-items: center;
      display: grid;
      grid-template-columns: 24px 24px;
      column-gap: 3px;
      margin-left: 7px;
      & > figure {
        width: 24px;
        height: 24px;
      }
    }
  }
  & > .right {
    display: flex;
    align-items: center;
    & > .time {
      font-size: 13px;
      color: #989898;
    }
    & > .btn-wrapper {
      margin-left: 31px;
      display: grid;
      grid-template-columns: repeat(3, 88px);
      column-gap: 14px;
      & > button {
        height: 37px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }
      & > .fix {
        background-color: #434343;
        color: white;
      }
      & > .remove {
        background-color: #007fff;
        color: white;
      }
      & > .blind {
        background-color: #dbdbdb;
        color: #434343;
      }
    }
  }
`;
function Card({
  index,
  title,
  timestamp,
  config: { isBlind, isPin },
  template,
  id,
  navigation,
  __delete,
  __blind,
}) {
  const isFile = template
    ? template.filter((item) => item.type === "file")
    : [];
  const [isOn, setIsOn] = useState(false);
  return (
    <Wrapper isBlind={isBlind}>
      <div className="left">
        <div className="index">{index}</div>
        <div className="title">{title}</div>
        <div className="badge">
          {isFile.length > 0 ? (
            <figure>
              <img src="/assets/common/file.svg" alt="" />
            </figure>
          ) : undefined}
          {isPin ? (
            <figure>
              <img src="/assets/common/blue-pin.svg" alt="" />
            </figure>
          ) : undefined}
        </div>
      </div>
      <div className="right">
        <div className="time">{formatDate(timestamp, ".")}</div>
        <div className="btn-wrapper">
          <button
            className="fix"
            onClick={() => {
              navigation("fix", timestamp, id);
            }}
          >
            수정하기
          </button>
          <button
            className="remove"
            onClick={() => {
              __delete(id);
            }}
          >
            삭제하기
          </button>
          <button
            className="blind"
            onClick={() => {
              __blind(id, isBlind);
            }}
          >
            {isBlind ? "블라인드해제" : "블라인드"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Card;
