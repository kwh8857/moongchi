import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
      data: { title, timestamp, name, tel, template, key, status, answer },
    },
  },
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({
        type: "@database/ANSWER_RESET",
      });
    };
  }, [dispatch]);
  return (
    <Wrapper>
      <div className="container">
        <TitleSection
          title={title}
          timestamp={timestamp}
          name={name}
          tel={tel}
        />
        <TemplateView data={template} status={status} />
        <AnswerBox id={key} answer={answer} />
      </div>
    </Wrapper>
  );
}

export default Answer;
