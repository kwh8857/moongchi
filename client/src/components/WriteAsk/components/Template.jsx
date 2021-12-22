import React from "react";
import styled from "styled-components";
import EdiHeader from "../../Editor/components/EdiHeader";
import Screen from "../../Editor/components/Screen";

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
    height: 737.6px;
  }
`;
function Template({ agent }) {
  return (
    <Wrapper className="editor-wrapper">
      <EdiHeader category="ask" state="new" agent={agent} />
      <Screen />
    </Wrapper>
  );
}

export default Template;
