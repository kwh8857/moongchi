import React from "react";
import styled, { css } from "styled-components";

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  border-bottom: solid 1px #dbdbdb;
  padding-left: 31px;
  padding-right: 22px;
  box-sizing: border-box;
  white-space: nowrap;
  cursor: pointer;
  & > .left {
    display: flex;
    align-items: center;
    & > .number {
      width: 18px;
      font-size: 15px;
      font-weight: bold;
      color: #007fff;
      margin-right: 61px;
    }
    & > .title {
      font-size: 15px;
      font-weight: bold;
      margin-right: 8px;
    }
    & > .icon {
      display: flex;
      align-items: center;
      & > figure {
        width: 24px;
        height: 24px;
      }
    }
  }
  ${(props) => {
    return css`
      background-color: ${props.isPin ? "#f7f8fa" : "white"};
    `;
  }}
`;
function NoticeCard({ data: { title, timestamp, isPin, isFile, index } }) {
  return (
    <Card isPin={isPin}>
      <div className="left">
        <div className="number">{index + 1}</div>
        <div className="title">{title}</div>
        <div className="icon">
          {isFile ? (
            <figure>
              <img src="/assets/common/file.svg" alt="file" />
            </figure>
          ) : undefined}
          {isPin ? (
            <figure>
              <img src="/assets/common/pin.svg" alt="" />
            </figure>
          ) : undefined}
        </div>
      </div>
      <div className="right">2021.1.23</div>
    </Card>
  );
}

export default NoticeCard;
