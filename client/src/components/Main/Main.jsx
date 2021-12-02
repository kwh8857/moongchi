import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SEARCH } from "../../reducers/actions";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
const Wrapper = styled.main`
  padding-top: 64px;
`;
function Main() {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.config);
  useEffect(() => {
    dispatch({
      type: SEARCH,
      payload: "ok",
    });
  }, [dispatch]);

  return (
    <Wrapper>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
    </Wrapper>
  );
}

export default Main;
