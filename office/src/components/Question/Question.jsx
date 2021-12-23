import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../common/Search";
import firebaseApp from "../config/firebaseApp";
import QuestionCard from "./components/QuestionCard";

const Fstore = firebaseApp.firestore();

const Wrapper = styled.main`
  padding-top: 117px;
  .container {
    & > .list-wrapper {
      margin-top: 33px;
      display: grid;
      row-gap: 12px;
    }
  }
`;
function Question() {
  const [original, setOriginal] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [keyword, setKeyword] = useState(undefined);
  const __changeFilter = useCallback(() => {
    setIsFilter(!isFilter);
  }, [isFilter]);
  const __searching = useCallback((val) => {
    if (val) {
      setKeyword(val);
    } else {
      setKeyword(undefined);
    }
  }, []);
  useEffect(() => {
    Fstore.collection("ask")
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        let arr = [];
        res.forEach((item) => {
          arr.push(
            Object.assign(item.data(), { index: arr.length, key: item.id })
          );
        });
        setOriginal(arr);
      });
    return () => {};
  }, []);
  useEffect(() => {
    let result = original.slice();
    if (isFilter) {
      result = result.filter(({ status }) => !status);
    }
    if (keyword) {
      result = result.filter(({ title }) => title.includes(keyword));
    }
    setQuestionList(result);
    return () => {};
  }, [isFilter, keyword, original]);
  return (
    <Wrapper>
      <div className="container">
        <Search
          title="고객문의 관리"
          type="question"
          placeholder="검색"
          change={__changeFilter}
          isfilter={isFilter}
          searching={__searching}
        />
        <div className="list-wrapper">
          {questionList.map((item, idx) => {
            return <QuestionCard key={idx} data={item} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default Question;
