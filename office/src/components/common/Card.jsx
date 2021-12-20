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
  position: relative;
  overflow: hidden;
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
  & > .setup {
    position: absolute;
    right: 0;
    top: 0;
    width: 420px;
    height: 65px;
    border-radius: 5px;
    background-color: #007fff;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: bold;
    box-sizing: border-box;
    padding-left: 18.3px;
    padding-right: 23.2px;
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
  const [On, setOn] = useState(undefined);
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
              setOn("blind");
              // __blind(id, isBlind);
            }}
          >
            {isBlind ? "블라인드해제" : "블라인드"}
          </button>
        </div>
      </div>
      {On ? (
        <div className="setup">
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.061"
              height="13.061"
              viewBox="0 0 13.061 13.061"
              style={{ fill: "none", stroke: "#fff", strokeWidth: "1.5px" }}
            >
              <g id="X" transform="translate(.53 .53)">
                <path
                  id="선_68"
                  data-name="선 68"
                  class="cls-1"
                  d="m0 0 12 12"
                />
                <path
                  id="선_69"
                  data-name="선 69"
                  class="cls-1"
                  d="M12 0 0 12"
                />
              </g>
            </svg>
          </figure>
          <div className="title">
            해당 게시글을 {On === "blind" ? "블라인드" : "삭제"}하시겠습니까?
          </div>
          <button>확인</button>
        </div>
      ) : undefined}
    </Wrapper>
  );
}

export default Card;
