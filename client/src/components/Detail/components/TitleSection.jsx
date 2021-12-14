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
  & > .timestamp {
    font-size: 14px;
    font-weight: 500;
    display: flex;
    color: #7c7c7c;
  }
`;

function TitleSection({ title, type, timestamp }) {
  return (
    <Wrapper>
      <div className="type">{type === "ask" ? "고객문의" : ""}</div>
      <div className="title">{title}</div>
      <div className="timestamp">{formatDate(timestamp, ".")}</div>
    </Wrapper>
  );
}

export default TitleSection;
