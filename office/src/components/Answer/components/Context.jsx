import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  white-space: pre-wrap;
  margin-bottom: 44px;
`;
function Context({ data }) {
  const TextRef = useRef(null);
  useEffect(() => {
    if (TextRef.current) {
      TextRef.current.innerHTML = data;
    }
    return () => {};
  }, [data]);
  return <TitleWrapper ref={TextRef}>콘텍스트</TitleWrapper>;
}

export default Context;
