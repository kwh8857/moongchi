import React, { useCallback, useMemo, useState } from "react";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Animation } from "../styles/Animation";
import firebaseApp from "../config/firebaseApp";
import Card from "../common/Card";
import { useDispatch } from "react-redux";
const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();
const Wrapper = styled.main``;
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
function Blog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ListData, setListData] = useState([]);
  const [DisplayList, setDisplayList] = useState([]);
  const __navMake = useCallback(
    (type, timestamp, id) => {
      history.push("/editor", {
        type,
        category: "blog",
        timestamp: timestamp ? timestamp : Date.now(),
        id: id ? id : undefined,
      });
    },
    [history]
  );
  const __getData = useCallback(async () => {
    let arr = [];
    await Fstore.collection("blog")
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
      Fstore.collection("blog")
        .doc(id)
        .update({
          config: {
            isBlind: !state,
          },
        })
        .then(() => {
          dispatch({
            type: "@config/TOAST",
            payload: {
              isactive: true,
              msg: `게시글이 블라인드${state ? "해제" : ""} 되었습니다`,
            },
          });
          __getData().then((result) => {
            setListData(result);
            setDisplayList(result);
          });
        });
    },
    [__getData, dispatch]
  );
  const __deleteCard = useCallback(
    async (id, file) => {
      let ref = await Fstorage.ref(`blog/${id}`);
      //해당 리워드에 존재하는 storage 파일들 전부삭제
      ref.listAll().then((dir) => {
        dir.items.forEach((fileRef) => {
          deleteFile(ref.fullPath, fileRef.name);
        });
        dir.prefixes.forEach((folderRef) => {
          deleteFolderContents(folderRef.fullPath);
        });
      });
      firebaseApp
        .firestore()
        .collection("blog")
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
          __getData().then((result) => {
            setListData(result);
            setDisplayList(result);
          });
        });
    },
    [__getData, dispatch]
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
    <Wrapper>
      <Animation>
        <Body>
          <Top>
            <div className="title">블로그 관리</div>
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
                게시글 추가
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
    </Wrapper>
  );
}

export default Blog;
function deleteFolderContents(path) {
  const ref = Fstorage.ref(path);
  ref.delete();
}

function deleteFile(pathToFile, fileName) {
  const ref = Fstorage.ref(pathToFile);
  const childRef = ref.child(fileName);
  childRef.delete();
}
