import React, { useCallback, useMemo, useState } from "react";
import Header from "../Header/Header";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Animation } from "../styles/Animation";
import firebaseApp from "../config/firebaseApp";
import Card from "../common/Card";

const List = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 33px;
  display: grid;
  grid-template-columns: 100%;
  row-gap: 12px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 30px;
    font-weight: bold;
  }
  .right {
    transform: translateY(10px);
    display: flex;

    .input-wrapper {
      width: 215px;
      height: 44px;
      border: solid 1px #dbdbdb;
      border-radius: 5px;
      display: flex;
      overflow: hidden;
      padding-left: 13px;
      padding-right: 16px;
      box-sizing: border-box;
      background-color: white;
      img {
        width: 21px;
        cursor: pointer;
      }
      input {
        margin-right: 10px;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-weight: 500;
      }
      input::placeholder {
        font-size: 16px;
        font-weight: 500;
        color: #a8a8a8;
      }
    }
    .btn {
      width: 153px;
      height: 44px;
      background-color: #e0e0e0;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
      font-size: 16px;
      font-weight: bold;
      color: #434343;
      cursor: pointer;
    }
  }
`;
const Body = styled.div`
  width: 992px;
  height: 100%;
  margin: 0 auto;
  padding-top: 117px;
  box-sizing: border-box;
`;
const Fstore = firebaseApp.firestore();
function Notice() {
  const history = useHistory();
  const [ListData, setListData] = useState([]);
  const [DisplayList, setDisplayList] = useState([]);
  const __navMake = useCallback(
    (type, timestamp, id) => {
      history.push("/editor", {
        type,
        category: "notice",
        timestamp: timestamp ? timestamp : Date.now(),
        id: id ? id : undefined,
      });
    },
    [history]
  );
  const __getData = useCallback(async () => {
    let arr = [];
    await Fstore.collection("notice")
      .orderBy("timestamp", "desc")
      .get()
      .then((result) => {
        if (result) {
          result.forEach((item) => {
            const value = item.data();
            arr.push(Object.assign(value, { id: item.id, index: arr.length }));
          });
        }
      });
    return arr;
  }, []);
  const __blind = useCallback(
    (id, state) => {
      Fstore.collection("notice")
        .doc(id)
        .update({
          config: {
            isBlind: !state,
          },
        })
        .then(() => {
          __getData().then((result) => {
            setListData(result);
            setDisplayList(result);
          });
        });
    },
    [__getData]
  );
  const __deleteCard = useCallback(
    (id, file) => {
      firebaseApp
        .firestore()
        .collection("notice")
        .doc(id)
        .delete()
        .then(() => {
          __getData().then((result) => {
            setListData(result);
            setDisplayList(result);
          });
        });
    },
    [__getData]
  );
  useMemo(
    () =>
      __getData().then((result) => {
        setListData(result);
        setDisplayList(result);
      }),
    [__getData]
  );
  return (
    <div>
      <Header />
      <Animation>
        <Body>
          <Top>
            <div className="title">공지사항 관리</div>
            <div className="right">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="프로젝트명 검색"
                  onChange={(e) => {
                    const val = e.target.value;
                    const filt = ListData.filter(
                      (item) => item.title && item.title.includes(val)
                    );
                    setDisplayList(filt);
                  }}
                />
                <img src="/assets/grey-search.svg" alt="검색" />
              </div>
              <div
                className="btn"
                onClick={() => {
                  __navMake("new");
                }}
              >
                공지사항 추가
              </div>
            </div>
          </Top>
          <List>
            {DisplayList.map(
              ({ title, timestamp, id, index, config, template }, idx) => {
                return (
                  <Card
                    __delete={__deleteCard}
                    navigation={__navMake}
                    key={idx}
                    id={id}
                    title={title}
                    timestamp={timestamp}
                    config={config}
                    index={ListData.length - index}
                    template={template}
                    __blind={__blind}
                  />
                );
              }
            )}
          </List>
        </Body>
      </Animation>
    </div>
  );
}

export default Notice;
