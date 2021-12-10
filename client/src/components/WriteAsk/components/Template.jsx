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
`;
function Template() {
  return (
    <Wrapper>
      <EdiHeader category="ask" state="new" />
      <Screen />
    </Wrapper>
  );
}

export default Template;
