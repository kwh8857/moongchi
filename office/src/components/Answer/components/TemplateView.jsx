import React from "react";
import styled from "styled-components";
import Context from "./Context";
import DisplayImage from "./DisplayImage";

const Wrapper = styled.div`
  padding-top: 25px;
`;

function TemplateView({ data }) {
  return (
    <Wrapper>
      {data.map(({ content, type, width }, idx) => {
        if (type === "image") {
          return <DisplayImage content={content} width={width} key={idx} />;
        } else if (type === "context") {
          return <Context key={idx} data={content} />;
        } else {
          return <></>;
        }
      })}
    </Wrapper>
  );
}

export default TemplateView;
