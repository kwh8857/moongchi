import React, { useEffect, useState } from "react";
import { useCallback } from "react";

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
  const handleScroll = useCallback(([entry], dom) => {
    const { current } = dom;
    if (current && entry.isIntersecting) {
      current.style.transitionProperty = "opacity ,transform";
      current.style.transitionDuration = "0.7s";
      current.style.transitionTimingFunction = "ease";
      current.style.transitionDelay = `0.2s`;
      current.style.opacity = "1";
      current.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);
  const getCookie = useCallback(() => {
    var cookie = document.cookie;
    if (document.cookie !== "") {
      let arr = [];
      var cookie_array = cookie.split("; ");
      for (var index in cookie_array) {
        var cookie_name = cookie_array[index].split("=");
        if (cookie_name[1] === "id") {
          arr.push(cookie_name[0]);
        }
      }
      return arr;
    }
  }, []);
  useEffect(() => {
    const isCheck = getCookie();
    firebaseApp
      .firestore()
      .collection("config")
      .doc("popup")
      .get()
      .then((res) => {
        if (res.exists) {
          const { list } = res.data();
          const arr = list.filter((item, idx) => {
            const time = new Date(item.time);
            time.setHours(0);
            if (Date.now() <= time.getTime()) {
              if (isCheck) {
                if (isCheck.indexOf(item.id) < 0) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return true;
              }
            } else {
              return false;
            }
          });
          // arr.reverse()
          if (arr.length > 0) {
            setisFirst(arr);
          }
        }
      });

    return () => {};
  }, [getCookie]);
  return (
    <Wrapper>
      <Section7 handleScroll={handleScroll} />
      <Section1 handleScroll={handleScroll} />
      <Section2 handleScroll={handleScroll} />
      <Section3 handleScroll={handleScroll} />
      <Section4 handleScroll={handleScroll} />
      <Section5 handleScroll={handleScroll} />
      <Section6 handleScroll={handleScroll} />
      <Section7 handleScroll={handleScroll} />
      {isFirst ? <FirstPopup data={isFirst} cancel={setisFirst} /> : undefined}
    </Wrapper>
  );
}

export default Main;
