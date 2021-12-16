import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import firebaseApp from "../config/firebaseApp";
import TemplateView from "./components/TemplateView";
import TitleSection from "./components/TitleSection";

const Wrapper = styled.main`
  width: 100%;
  height: fit-content;
  padding-top: 140px;
  padding-bottom: 166px;
`;

const Fstore = firebaseApp.firestore();

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.pathname.split("/")[2];
  const key = location.pathname.split("/")[3];
  const [data, setData] = useState(undefined);
  useEffect(() => {
    if (type === "ask" && location.state === null) {
      alert("잘못된 접근입니다.");
      navigate("/");
    } else {
      Fstore.collection(type)
        .doc(key)
        .get()
        .then((res) => {
          setData(res.data());
        });
    }
    return () => {};
  }, [type, key]);
  return (
    <Wrapper>
      {data ? (
        <div className="container">
          <TitleSection
            title={data.title}
            type={type}
            timestamp={data.timestamp}
          />
          <TemplateView data={data.template} type={type} answer={data.answer} />
        </div>
      ) : undefined}
    </Wrapper>
  );
}

export default Detail;
