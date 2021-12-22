import React from "react";
import styled from "styled-components";
import Answer from "./Answer";

import Context from "./Context";
import DisplayImage from "./DisplayImage";
import DisplayLink from "./DisplayLink";
import Video from "./Video";

const Wrapper = styled.div`
  padding-top: 25px;
`;

function TemplateView({ data, type, answer }) {
  return (
    <Wrapper>
      {data.map(({ content, type, width }, idx) => {
        if (type === "image" || type === "IMAGE") {
          return <DisplayImage content={content} width={width} key={idx} />;
        } else if (type === "context" || type === "TITLE") {
          return <Context key={idx} data={content} />;
        } else if (type === "FILE" || type === "LINK") {
          return <DisplayLink key={idx} content={content} type={type} />;
        } else if (type === "VIDEO") {
          return <Video key={idx} content={content} />;
        } else {
          return <></>;
        }
      })}
      {type === "ask" && answer ? <Answer data={answer} /> : undefined}
    </Wrapper>
  );
}

export default TemplateView;
