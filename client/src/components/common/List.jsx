import React from "react";
import styled, { css } from "styled-components";
import AskCard from "../Ask/components/AskCard";
import NoticeCard from "../Notice/components/NoticeCard";

const Wrapper = styled.section`
  display: grid;
  margin-top: 39px;
  ${(props) => {
    return css`
      border-bottom: ${props.type === "ask" ? "solid 1px #dbdbdb" : "unset"};
    `;
  }}
`;
function List({ type, data }) {
  return (
    <Wrapper type={type}>
      {data.map((item, idx) => {
        return type === "ask" ? (
          <AskCard key={idx} data={item} index={data.length - idx} />
        ) : (
          <NoticeCard
            key={idx}
            data={item}
            index={data.length - idx}
            type={type}
          />
        );
      })}
    </Wrapper>
  );
}

export default List;
