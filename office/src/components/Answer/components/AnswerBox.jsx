import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Resizer from "react-image-file-resizer";
import firebaseApp from "../../config/firebaseApp";
import { useHistory } from "react-router-dom";

const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();

const Wrapper = styled.div`
  height: 533px;
  width: 100%;
  background-color: #f7f8fa;
  border-radius: 10px;
  padding: 26.5px 30px 42px 30px;
  box-sizing: border-box;
  position: relative;
  & > .title-wrapper {
    display: flex;
    align-items: center;
    & > figure {
      width: 15.7px;
      height: 21px;
    }
    & > .title {
      margin-left: 11.5px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  & > textarea {
    margin-top: 22px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 17px;
    width: 100%;
    height: 251px;
    border: solid 1px #dbdbdb;
    border-radius: 5px;
  }
  & > .insert-wrapper {
    margin-top: 19px;
    & > div {
      font-size: 13px;
      font-weight: bold;
    }
    & > .image-insert {
      margin-top: 6px;
      width: 100%;
      height: 44px;
      background-color: white;
      border: solid 1px #dbdbdb;
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding-left: 13px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      & > input {
        position: absolute;
        z-index: 10;
        cursor: pointer;
      }
      & > figure {
        width: 23px;
        height: 23px;
      }
      & > div {
        font-size: 15px;
        font-weight: 500;
        margin-left: 8px;
      }
    }
  }
  & > .init {
    justify-self: flex-end;
    margin-top: 35px;
    width: 153px;
    height: 44px;
    border-radius: 6px;
    background-color: #007fff;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    right: 30px;
  }
  ${(props) => {
    return css`
      & > .insert-wrapper {
        & > .image-insert {
          & > div {
            color: ${props.isImage ? "#007fff" : "#a8a8a8"};
          }
        }
      }
    `;
  }}
`;

function AnswerBox({ id, status, answer }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const ContentRef = useRef(null);
  const {
    image: { url, name, resize },
  } = useSelector((state) => state.database.answer);
  const __storageInit = useCallback((url, resize, id) => {
    return new Promise((resolve, reject) => {
      if (!url) {
        resolve(undefined);
      } else {
        if (url.includes("firebase")) {
          resolve({
            url,
            resize,
          });
        } else {
          const data = url.split(",")[1];
          const redata = resize.split(",")[1];
          Fstorage.ref(`ask/${id}-asnwer`)
            .putString(data, "base64", {
              contentType: "image/jpeg",
            })
            .then((result) => {
              result.ref.getDownloadURL().then((downloadUrl) => {
                Fstorage.ref(`ask/${id}-answer-resize`)
                  .putString(redata, "base64", {
                    contentType: "image/jpeg",
                  })
                  .then((res) => {
                    res.ref.getDownloadURL().then((resizeUrl) => {
                      resolve({
                        url: downloadUrl,
                        resize: resizeUrl,
                      });
                    });
                  });
              });
            });
        }
      }
    });
  }, []);

  const __updateAnswer = useCallback(() => {
    dispatch({
      type: "@config/isLoading",
      payload: true,
    });
    const content = ContentRef.current.value;
    __storageInit(url, resize, id).then((res) => {
      Fstore.collection("ask")
        .doc(id)
        .update({
          answer: {
            image: {
              url: res ? res.url : "",
              resize: res ? res.resize : "",
              name,
            },
            content,
            timestamp: Date.now(),
          },
          status: true,
        })
        .then(() => {
          dispatch({
            type: "@config/TOAST",
            payload: {
              isactive: true,
              msg: "답변이 등록되었습니다",
            },
          });
          dispatch({
            type: "@config/isLoading",
            payload: false,
          });
          history.goBack();
        });
    });
  }, [ContentRef, __storageInit, url, resize, id, name, dispatch, history]);

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
                name: file.name,
                width: this.width,
                height: this.height,
              });
            },
            "base64"
          );
        };
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const __imageupload = useCallback(
    (e) => {
      __fileReader(e.target.files[0]).then((res) => {
        dispatch({
          type: "@database/ANSWER_IMAGE",
          payload: res,
        });
      });
    },
    [__fileReader, dispatch]
  );
  useEffect(() => {
    if (answer && ContentRef) {
      ContentRef.current.value = answer.content;
      dispatch({
        type: "@database/ANSWER_IMAGE",
        payload: answer.image,
      });
    }
    return () => {};
  }, [ContentRef, status, answer, dispatch]);
  return (
    <Wrapper isImage={url ? true : false}>
      <div className="title-wrapper">
        <figure>
          <img src="/assets/answer/arrow.svg" alt="" />
        </figure>
        <div className="title">관리자 답변</div>
      </div>
      <textarea placeholder="답변 입력" ref={ContentRef} />
      <div className="insert-wrapper">
        <div>이미지첨부</div>
        <label className="image-insert">
          <input
            type="file"
            style={{ opacity: 0 }}
            accept="image/x-png,image/gif,image/jpeg"
            onChange={__imageupload}
          />
          <figure>
            <img src={`/assets/answer/${url ? "clip" : "add"}.svg`} alt="" />
          </figure>
          <div>{url ? name : "이미지를 첨부해주세요"}</div>
        </label>
      </div>
      <button className="init" onClick={__updateAnswer}>
        답변등록
      </button>
    </Wrapper>
  );
}

export default AnswerBox;
