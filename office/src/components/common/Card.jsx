import React, { useState } from "react";
import styled, { css } from "styled-components";
import { formatDate } from "../lib/factory";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 65px;
  width: 100%;
  justify-content: space-between;
  padding-right: 12px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  & > .left {
    display: flex;
    align-items: center;
    font-size: 16px;
    & > .index {
      width: 76px;
      font-weight: bold;
      text-align: center;
    }
    & > .title-wrapper {
      display: flex;
      align-items: center;
      font-weight: bold;
      width: 440px;
      & > .title {
        white-space: nowrap;
        max-width: 390px;
        overflow: hidden;
        text-overflow: ellipsis;
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
        color: white;
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
      background-color: ${props.isBlind ? "transparent" : "white"};
      border: ${props.isBlind ? "solid 1px #dbdbdb" : "unset"};
      & > .setup {
        right: ${props.on ? "0" : "-430px"};
        transition: right 0.2s ease-in-out;
        background-color: ${props.on === "remove" ? "#007fff" : "#dbdbdb"};
      }
      & > .right {
        & > .btn-wrapper {
          & > .blind {
            background-color: ${props.isBlind ? "#007fff" : "#dbdbdb"};
            color: ${props.isBlind ? "white" : "#434343"};
          }
          & > .fix {
            background-color: ${props.isBlind ? "#dbdbdb" : "#434343"};
          }
          & > .remove {
            background-color: ${props.isBlind ? "#dbdbdb" : "#007fff;"};
          }
        }
      }
      & > .left {
        & > .index {
          color: ${props.isBlind ? "#a8a8a8" : "#007fff"};
        }
        & > .title {
          color: ${props.isBlind ? "#a8a8a8" : "black"};
        }
      }
    `;
  }}
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
    ? template.filter((item) => item.type === "FILE")
    : [];
  const [On, setOn] = useState(undefined);
  return (
    <Wrapper isBlind={isBlind} on={On}>
      <div className="left">
        <div className="index">{index}</div>
        <div className="title-wrapper">
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
              setOn("remove");
            }}
          >
            삭제하기
          </button>
          <button
            className="blind"
            onClick={() => {
              setOn("blind");
            }}
          >
            {isBlind ? "블라인드해제" : "블라인드"}
          </button>
        </div>
      </div>

      <div className="setup">
        <div className="left">
          <figure
            onClick={() => {
              setOn(undefined);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.061"
              height="13.061"
              viewBox="0 0 13.061 13.061"
              style={{
                fill: "none",
                stroke: On === "remove" ? "#fff" : "rgb(51,51,51)",
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
          <div className="title">
            해당 게시글을{" "}
            {On === "blind"
              ? isBlind
                ? "블라인드 해제"
                : "블라인드 "
              : "삭제"}
            하시겠습니까?
          </div>
        </div>
        <button
          onClick={() => {
            if (On === "blind") {
              __blind(id, isBlind);
            } else {
              __delete(id);
            }
            setOn(undefined);
          }}
        >
          확인
        </button>
      </div>
    </Wrapper>
  );
}

export default Card;
