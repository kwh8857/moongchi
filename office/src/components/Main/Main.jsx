import React, { useCallback, useMemo, useState } from "react";
import Header from "../Header/Header";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Card from "./components/Card";
import firebaseApp from "../config/firebaseApp";
import { Animation } from "../styles/Animation";

let dummy = [
  {
    title: "안녕하세요 김과장 컨설팅입니다",
    category: "우리이야기",
    template: [],
    timestamp: Date.now(),
  },
  {
    title: "안녕하세요 김과장 컨설팅입니다",
    category: "우리이야기",
    template: [],
    timestamp: Date.now(),
  },
  {
    title: "안녕하세요 김과장 컨설팅입니다",
    category: "우리이야기",
    template: [],
    timestamp: Date.now(),
  },
  {
    title: "안녕하세요 김과장 컨설팅입니다",
    category: "우리이야기",
    template: [],
    timestamp: Date.now(),
  },
];

const List = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 33px;
  display: grid;
  grid-template-columns: 100%;
  row-gap: 17px;
  .card {
    overflow: hidden;
    position: relative;
    height: 65px;
    width: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 26px;
    padding-right: 17px;
    background-color: white;
    .left {
      display: flex;
      align-items: center;
      & > .title {
        font-size: 16px;
        font-weight: bold;
      }
      & > .category {
        font-size: 16px;
        font-weight: bold;
        color: #00be83;
        margin-right: 34px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      & > .time {
        font-size: 13px;
        font-weight: 500;
        color: #989898;
        margin-right: 31px;
      }
      & > .btn-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 88px);
        column-gap: 14px;
        & > div {
          width: 100%;
          height: 37px;
          font-size: 15px;
          font-weight: bold;
          color: white;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .fix {
          background-color: #434343;
        }
        .remove {
          background-color: #47d99b;
        }
      }
    }
    .delete-wrapper {
      transition: right 0.2s ease-in-out;
      border-radius: 10px;
      padding-left: 15px;
      box-sizing: border-box;
      align-items: center;
      position: absolute;
      right: 0;
      display: flex;
      width: 348.4px;
      height: 73px;
      background-color: #47d99b;
      .white-cancel {
        cursor: pointer;
        margin-right: 11.5px;
        width: 12px;
      }
      .delete-title {
        font-size: 13px;
        font-weight: bold;
        color: white;
      }
      .delete-btn {
        cursor: pointer;
        margin-left: 32px;
        color: #47d99b;
        border-radius: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        font-weight: bold;
        width: 72px;
        height: 27px;
        background-color: white;
      }
    }
  }
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
      background-color: white;
      width: 215px;
      height: 44px;
      border: solid 1px #dbdbdb;
      border-radius: 5px;
      display: flex;
      overflow: hidden;
      padding-left: 13px;
      padding-right: 16px;
      box-sizing: border-box;
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
  width: 1001px;
  height: 100%;
  margin: 0 auto;
  padding-top: 117px;
  box-sizing: border-box;
`;
function Main() {
  const history = useHistory();
  const [ListData, setListData] = useState([]);
  const [DisplayList, setDisplayList] = useState([]);

  const __navMake = useCallback(
    (type, timestamp, id) => {
      history.push("/editor", {
        type,
        category: "portfolio",
        timestamp: timestamp ? timestamp : Date.now(),
        id: id ? id : undefined,
      });
    },
    [history]
  );
  const __getData = useCallback(async () => {
    let arr = [];
    await firebaseApp
      .firestore()
      .collection("editor")
      .get()
      .then((result) => {
        if (result) {
          result.forEach((item) => {
            const value = item.data();
            if (value.state === "portfolio") {
              arr.push(Object.assign(value, { id: item.id }));
            }
          });
        }
      });
    return arr.sort((a, b) => b.timestamp - a.timestamp);
  }, []);
  const __deleteCard = useCallback(
    (id, file) => {
      firebaseApp
        .firestore()
        .collection("editor")
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
            <div className="title">지원사업 관리</div>
            <div className="right">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="프로젝트명 검색"
                  onChange={(e) => {
                    const val = e.target.value;
                    const filt = ListData.filter((item) =>
                      item.title.includes(val)
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
                공사실적 추가
              </div>
            </div>
          </Top>
          <List>
            {dummy.map(({ title, timestamp, id, template, category }, idx) => {
              return (
                <Card
                  __delete={__deleteCard}
                  navigation={__navMake}
                  key={idx}
                  id={id}
                  title={title}
                  timestamp={timestamp}
                  template={template}
                  category={category}
                />
              );
            })}
          </List>
        </Body>
      </Animation>
    </div>
  );
}

export default React.memo(Main);
