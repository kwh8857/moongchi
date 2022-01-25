import React from "react";
import styled from "styled-components";
import EdiHeader from "../../Editor/components/EdiHeader";
import Screen from "../../Editor/components/Screen";
import InitBtn from "./InitBtn";
const Wrapper = styled.section`
  width: 100%;
  height: 737.6px;
  border: solid 1px #dbdbdb;
  border-radius: 5px;
  margin-top: 44.3px;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  @media screen and (max-width: 1024px) {
    position: unset;
    height: fit-content;
    min-height: 737.6px;
    overflow-y: hidden;
  }
  @media screen and (max-width: 769px) {
    .top-wrapper {
      left: 0;
      width: 100%;
      display: flex;
      position: fixed;
      top: 64px;
      padding: 20px;
      box-sizing: border-box;
      justify-content: space-between;
      z-index: 1000;
      background-color: white;
      & > .title {
        font-size: 26px;
        font-weight: bold;
      }
    }
  }
`;
function Template({ agent }) {
  return (
    <Wrapper className="editor-wrapper">
      {agent === "mobile" ? (
        <div className="top-wrapper">
          <div className="title">문의하기</div>
          <InitBtn isInit={true} />
        </div>
      ) : undefined}
      <EdiHeader category="ask" state="new" agent={agent} />
      <Screen />
    </Wrapper>
  );
}

export default Template;
