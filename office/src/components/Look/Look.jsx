import React from "react";
import styled from "styled-components";
import Search from "../common/Search";
import LookCard from "./components/LookCard";

const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Wrapper = styled.main`
  padding-top: 117px;
  background-color: #f8f8f8;
  padding-bottom: 219px;
  .container {
    & > .list {
      margin-top: 36px;
      display: grid;
      row-gap: 24px;
    }
  }
`;

function Look() {
  return (
    <Wrapper>
      <div className="container">
        <Search title="미리보기 관리" type="look" />
        <div className="list">
          {arr.map((item, idx) => {
            return <LookCard key={idx} index={idx} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default Look;
