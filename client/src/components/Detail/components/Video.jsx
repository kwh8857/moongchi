import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  margin-bottom: 45px;
  video {
    max-width: 100%;
  }
`;
function Video({ content }) {
  return (
    <Wrapper>
      <video src={content} controls></video>
    </Wrapper>
  );
}

export default Video;
