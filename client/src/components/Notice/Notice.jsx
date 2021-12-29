import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import List from "../common/List";
import Search from "../common/Search";
import firebaseApp from "../config/firebaseApp";

const Fstore = firebaseApp.firestore();
const Wrapper = styled.main`
  width: 100%;
  min-height: 100%;
  padding-top: 151px;
  & > .container {
    & > .pager-wrapper {
      margin-top: 102px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > figure {
        width: 7px;
        height: 13px;
        cursor: pointer;
      }
      & > .pages {
        display: grid;
        margin: 0 28.5px;
        column-gap: 4px;
        & > div {
          cursor: pointer;
          width: 30px;
          height: 29px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
        }
        & > .now {
          background-color: #007fff;
          color: white;
        }
        & > .next {
          color: #434343;
          border: solid 1px #dbdbdb;
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    height: fit-content;
    padding-bottom: 100px;
    & > .container {
      width: 100%;
    }
  }
  ${(props) => {
    return css`
      .pages {
        grid-template-columns: ${props.isNext ? "29px 29px" : "29px"};
      }
    `;
  }}
`;
function Notice() {
  const [now, setNow] = useState(1);
  const [original, setOriginal] = useState([]);
  const [displayList, setdisplayList] = useState([]);
  const length = parseFloat(String(displayList.length / 10));
  const __changePage = useCallback(
    (type) => {
      if (type === "next") {
        setNow(now + 1);
      } else if (now !== 1) {
        setNow(now - 1);
      }
    },
    [now]
  );
  const __seaching = useCallback(
    (e) => {
      if (e.target.value) {
        const arr = original.slice();
        const filt = arr.filter(({ title }) => title.includes(e.target.value));
        setdisplayList(filt);
      } else {
        setdisplayList(original);
      }
    },
    [original]
  );
  useEffect(() => {
    Fstore.collection("notice")
      // .where("config.isBlind", "==", false)
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        let arr = [];
        let pinarr = [];
        if (!res.empty) {
          res.forEach((item) => {
            const value = item.data();
            if (!value.config.isBlind) {
              if (value.config.isPin) {
                pinarr.push(Object.assign(value, { id: item.id }));
              } else {
                arr.push(Object.assign(value, { id: item.id }));
              }
            }
          });
          const contac = pinarr.concat(arr);
          setdisplayList(contac);
          setOriginal(contac);
        } else {
          setdisplayList([]);
          setOriginal([]);
        }
      });
    return () => {};
  }, []);
  return (
    <Wrapper>
      <Search type="notice" searching={__seaching} />
      <div className="container">
        <List type="notice" data={displayList} />
        <div className="pager-wrapper">
          <figure
            onClick={() => {
              __changePage("befor");
            }}
          >
            <img src="/assets/common/left-arrow.svg" alt="" />
          </figure>
          <div className="pages">
            {now > length && length >= 1 ? (
              <div
                className="next"
                onClick={() => {
                  __changePage("befor");
                }}
              >
                {now - 1}
              </div>
            ) : undefined}
            <div className="now">{now}</div>
            {length !== 0 && now < length ? (
              <div
                className="next"
                onClick={() => {
                  __changePage("next");
                }}
              >
                {now + 1}
              </div>
            ) : undefined}
          </div>
          <figure
            onClick={() => {
              __changePage("next");
            }}
          >
            <img src="/assets/common/right-arrow.svg" alt="" />
          </figure>
        </div>
      </div>
    </Wrapper>
  );
}

export default Notice;
