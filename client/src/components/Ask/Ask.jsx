import React from "react";
import styled from "styled-components";
import Search from "../common/Search";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 151px;
`;

function Ask() {
  return (
    <Wrapper>
      <Search type="ask" />
    </Wrapper>
  );
}

export default Ask;
