import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../common/Search";
import firebaseApp from "../config/firebaseApp";
import LookCard from "./components/LookCard";
import { useDispatch, useSelector } from "react-redux";
const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();

const Wrapper = styled.main`
  padding-top: 117px;
  background-color: #f8f8f8;
  padding-bottom: 219px;
  .container {
    & > .list {
      margin-top: 36px;
      display: grid;
      row-gap: 24px;
    }
  }
`;

function Look() {
  const dispatch = useDispatch();
  const List = useSelector((state) => state.database.preview);

  const __imageUpload = useCallback((e, index) => {}, []);

  useEffect(() => {
    Fstore.collection("config")
      .doc("preview")
      .get()
      .then((res) => {
        if (!res.empty) {
          dispatch({
            type: "@database/PREVIEW",
            payload: res.data().list,
          });
        }
      });
    return () => {};
  }, []);
  return (
    <Wrapper>
      <div className="container">
        <Search title="미리보기 관리" type="look" />
        <div className="list">
          {List.map((item, idx) => {
            return (
              <LookCard
                key={idx}
                index={idx}
                data={item}
                imageupload={__imageUpload}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default Look;
