import React from "react";
import styled from "styled-components";
import { formatDate } from "../../lib/factory";
const Card = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  background-color: white;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  padding-right: 21px;
  box-sizing: border-box;
  & > .left {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    & > .index {
      width: 78px;
      color: #007fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  & > .right {
    font-size: 13px;
    font-weight: 500;
    color: #989898;
  }
`;

function DownCard({ data: { email, timestamp }, index }) {
  return (
    <Card>
      <div className="left">
        <div className="index">{index}</div>
        <div className="email">{email}</div>
      </div>
      <div className="right">인증일 {formatDate(timestamp, ".")}</div>
    </Card>
  );
}

export default DownCard;
