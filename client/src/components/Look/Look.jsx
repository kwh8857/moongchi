import React from "react";
import styled from "styled-components";
import HeadPopup from "./components/HeadPopup";
import List from "./components/List/List";
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
`;
function Look() {
  return (
    <Wrapper>
      <HeadPopup />
      <List />
    </Wrapper>
  );
}

export default Look;
