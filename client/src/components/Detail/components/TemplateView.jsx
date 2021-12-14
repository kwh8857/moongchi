import React from "react";
import styled from "styled-components";
import Context from "./Context";
import DisplayImage from "./DisplayImage";

const Wrapper = styled.div``;

function TemplateView({ data }) {
  return (
    <Wrapper>
      {data.map(({ content, type, width }, idx) => {
        if (type === "image") {
          return <DisplayImage content={content} width={width} key={idx} />;
        } else if (type === "context") {
          return <Context key={idx} />;
        }
      })}
    </Wrapper>
  );
}

export default TemplateView;
