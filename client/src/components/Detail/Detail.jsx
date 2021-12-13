import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

function Detail() {
  const location = useLocation();
  return <Wrapper>메인</Wrapper>;
}

export default Detail;
