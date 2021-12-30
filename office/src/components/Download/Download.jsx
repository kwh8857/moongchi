import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../common/Search";
import firebaseApp from "../config/firebaseApp";
import { formatDate } from "../lib/factory";
import DownCard from "./components/DownCard";
const firestore = firebaseApp.firestore();

const Wrapepr = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 117px;
  background-color: #f8f8f8;
  .container {
    & > .list-wrapper {
      margin-top: 33px;
      display: grid;
      row-gap: 12px;
    }
  }
`;

function Download() {
  const [original, setOriginal] = useState([]);
  const [List, setList] = useState([]);
  const [CsvData, setCsvData] = useState(undefined);
  const __Searching = useCallback(
    (val) => {
      if (val) {
        const filt = original.filter((item) => item.email.includes(val));
        setList(filt);
      } else {
        setList(original);
      }
    },
    [original]
  );
  useEffect(() => {
    firestore
      .collection("download")
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        if (res) {
          let arr = [];
          res.forEach((item) => {
            arr.push(Object.assign(item.data(), { index: arr.length }));
          });
          const csvarr = arr.map(({ email, timestamp }, idx) => {
            return [email, formatDate(timestamp, ".")];
          });
          setCsvData(csvarr);
          setOriginal(arr);
          setList(arr);
        }
      });
    return () => {};
  }, []);
  return (
    <Wrapepr>
      <div className="container">
        <Search
          title={"다운로드 관리"}
          type="down"
          placeholder="이메일 검색"
          CsvData={CsvData}
          searching={__Searching}
        />
        <div className="list-wrapper">
          {List.map((item, idx) => {
            return (
              <DownCard
                data={item}
                key={idx}
                index={original.length - item.index}
              />
            );
          })}
        </div>
      </div>
    </Wrapepr>
  );
}

export default Download;
