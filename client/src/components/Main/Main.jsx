import React, { useEffect, useState } from "react";

import styled from "styled-components";
import firebaseApp from "../config/firebaseApp";
import FirstPopup from "../FirstPopup/FirstPopup";

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
  const [isFirst, setisFirst] = useState(undefined);
  useEffect(() => {
    firebaseApp
      .firestore()
      .collection("config")
      .doc("popup")
      .get()
      .then((res) => {
        if (!res.emty) {
          const value = res.data();
          const time = new Date(value.time);
          time.setHours(0);
          if (Date.now() <= time.getTime()) {
            setisFirst(res.data());
          }
        }
      });
    return () => {};
  }, []);
  return (
    <Wrapper>
      <Section7 />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      {isFirst ? <FirstPopup data={isFirst} cancel={setisFirst} /> : undefined}
    </Wrapper>
  );
}

export default Main;
