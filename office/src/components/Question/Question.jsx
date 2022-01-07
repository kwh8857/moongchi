import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Search from "../common/Search";
import firebaseApp from "../config/firebaseApp";
import QuestionCard from "./components/QuestionCard";

const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();
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
  const dispatch = useDispatch();
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
  const __getData = useCallback(() => {
    Fstore.collection("ask")
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        if (!res.empty) {
          let arr = [];
          res.forEach((item) => {
            arr.push(
              Object.assign(item.data(), { index: arr.length, key: item.id })
            );
          });
          setOriginal(arr);
        } else {
          setOriginal([]);
        }
      });
  }, []);
  const __remove = useCallback(
    (id, template, answer) => {
      template.forEach(({ type, content }) => {
        if (type === "IMAGE") {
          Fstorage.refFromURL(content.url).delete();
          Fstorage.refFromURL(content.resize).delete();
        }
      });
      if (answer && answer.image.url !== "") {
        Fstorage.refFromURL(answer.image.url).delete();
        Fstorage.refFromURL(answer.image.resize).delete();
      }
      firebaseApp
        .firestore()
        .collection("ask")
        .doc(id)
        .delete()
        .then(() => {
          dispatch({
            type: "@config/TOAST",
            payload: {
              isactive: true,
              msg: "게시글이 삭제되었습니다",
            },
          });
          __getData();
        })
        .catch((err) => {
          dispatch({
            type: "@config/TOAST",
            payload: {
              isactive: true,
              msg: `에러코드 : ${err.code}`,
            },
          });
        });
    },
    [__getData, dispatch]
  );

  useEffect(() => {
    __getData();
    return () => {};
  }, [__getData]);
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
            return <QuestionCard key={idx} data={item} remove={__remove} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default Question;
