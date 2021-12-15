import React from "react";
import styled from "styled-components";
import AnswerBox from "./components/AnswerBox";
import TemplateView from "./components/TemplateView";
import TitleSection from "./components/TitleSection";

const Wrapper = styled.main`
  padding: 140px 0;
  width: 100%;
  height: fit-content;
  background-color: white;
`;

function Answer({
  location: {
    state: {
      data: { title, timestamp, name, tel, template },
    },
  },
}) {
  return (
    <Wrapper>
      <div className="container">
        <TitleSection
          title={title}
          timestamp={timestamp}
          name={name}
          tel={tel}
        />
        <TemplateView data={template} />
        <AnswerBox />
      </div>
    </Wrapper>
  );
}

export default Answer;
