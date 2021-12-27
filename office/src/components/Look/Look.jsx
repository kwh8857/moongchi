import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../common/Search";
import firebaseApp from "../config/firebaseApp";
import LookCard from "./components/LookCard";
import { useDispatch, useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import Preview from "./components/Preview";
const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();

const Wrapper = styled.main`
  width: 100%;
  height: fit-content;
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
  const removeList = useSelector((state) => state.database.question.removelist);
  const [isPreview, setIsPreview] = useState(false);
  const __storage = useCallback((data64, index, resize) => {
    return new Promise((resolve, reject) => {
      const data = data64.split(",")[1];
      const redata = resize.split(",")[1];
      Fstorage.ref(`preview/${index}`)
        .putString(data, "base64", {
          contentType: "image/jpeg",
        })
        .then((result) => {
          result.ref.getDownloadURL().then((downloadUrl) => {
            Fstorage.ref(`preview/${index}-resize`)
              .putString(redata, "base64", {
                contentType: "image/jpeg",
              })
              .then((result) => {
                result.ref.getDownloadURL().then((resizeUrl) => {
                  resolve({ url: downloadUrl, resize: resizeUrl });
                });
              });
          });
        });
    });
  }, []);
  const __uploadData = useCallback(() => {
    dispatch({
      type: "@config/isLoading",
      payload: true,
    });
    if (removeList.length > 0) {
      removeList.forEach((item) => {
        Fstorage.refFromURL(item).delete();
      });
      dispatch({
        type: "@database/QUESTION_REMOVE_RESET",
      });
    }
    Promise.all(
      List.map((item, idx) => {
        if (item.image.url.substr(0, 4) === "data") {
          const storage = __storage(
            item.image.url,
            item.id,
            item.image.resize
          ).then((res) => {
            return Object.assign(item, { image: res });
          });
          return storage;
        } else {
          return item;
        }
      })
    ).then((res) => {
      Fstore.collection("config")
        .doc("preview")
        .set({
          list: res,
        })
        .then(() => {
          dispatch({
            type: "@config/TOAST",
            payload: {
              isactive: true,
              msg: "미리보기가 저장되었습니다",
            },
          });
          dispatch({
            type: "@config/isLoading",
            payload: false,
          });
        });
    });
  }, [List, __storage, dispatch, removeList]);
  const __fileReader = useCallback((file) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        var img = new Image();
        img.src = imageUrl;
        img.onload = function (e) {
          Resizer.imageFileResizer(
            file,
            5,
            5,
            "JPEG",
            100,
            0,
            (uri) => {
              resolve({
                url: imageUrl,
                resize: uri,
              });
            },
            "base64"
          );
        };
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const __imageUpload = useCallback(
    (e, index, image, resize) => {
      if (image) {
        dispatch({
          type: "@database/QUESTION_REMOVE",
          payload: image,
          resize,
        });
      }
      __fileReader(e.target.files[0]).then((res) => {
        dispatch({
          type: "@database/PREVIEW_IMAGE",
          payload: res,
          index: index,
        });
      });
    },
    [__fileReader, dispatch]
  );
  const __removeList = useCallback(
    (idx) => {
      let arr = List.slice();
      arr.splice(idx, 1);
      dispatch({
        type: "@database/PREVIEW",
        payload: arr,
      });
    },
    [List, dispatch]
  );
  const __listAdd = useCallback(() => {
    let arr = List.slice();
    arr.unshift({
      title: "",
      category: "",
      content: "",
      link: "",
      image: {
        url: "",
        resize: "",
      },
      id: `preview-${
        new Date().getTime() - Math.floor(Math.random() * (100 - 1 + 1)) + 1
      }`,
      timestamp: Date.now(),
    });
    dispatch({
      type: "@database/PREVIEW",
      payload: arr,
    });
  }, [List, dispatch]);
  const __preview = useCallback((state) => {
    setIsPreview(state);
  }, []);
  useEffect(() => {
    Fstore.collection("config")
      .doc("preview")
      .get()
      .then((res) => {
        if (res.exists) {
          if (res.data().list) {
            dispatch({
              type: "@database/PREVIEW",
              payload: res.data().list,
            });
          } else {
            dispatch({
              type: "@database/PREVIEW_RESET",
            });
          }
        }
      });
    return () => {};
  }, [dispatch]);
  return (
    <Wrapper>
      <div className="container">
        <Search
          title="미리보기 관리"
          type="look"
          upload={__uploadData}
          add={__listAdd}
          preview={__preview}
        />
        <div className="list">
          {List.map((item, idx) => {
            return (
              <LookCard
                key={idx}
                index={idx}
                data={item}
                imageupload={__imageUpload}
                displayIndex={List.length - idx}
                remove={__removeList}
              />
            );
          })}
        </div>
      </div>
      {isPreview ? <Preview list={List} __preview={__preview} /> : undefined}
    </Wrapper>
  );
}

export default Look;
