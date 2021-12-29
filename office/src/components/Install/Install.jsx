import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import firebaseApp from "../config/firebaseApp";
import { formatDate } from "../lib/factory";

const Fstorage = firebaseApp.storage();
const Fstore = firebaseApp.firestore();
const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  & > .title {
    width: 993px;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 33px;
  }
  & > .upload-box {
    border-radius: 5px;
    padding: 23px 49px 28px 27px;
    box-sizing: border-box;
    width: 993px;
    height: 338px;
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    & > .title {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
        font-size: 13px;
        color: #3597ec;
      }
    }
    & > .file-insert {
      margin-top: 38px;
      align-self: flex-end;
      cursor: pointer;
      width: 894px;
      height: 149px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      & > img {
        width: 38.9px;
        height: 48.9px;
      }

      & > .insert-title {
        margin-top: 8px;
        font-size: 14px;
        font-weight: bold;
        color: #c3c3c3;
      }
    }
    & > button {
      width: 110px;
      height: 44px;
      font-size: 14px;
      font-weight: bold;
      color: white;
      margin-top: 27px;
      align-self: flex-end;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
  }
  ${(props) => {
    return css`
      & > .upload-box {
        & > .file-insert {
          background-color: ${props.isFile ? "rgb(234,244,252)" : "#f7f7f7"};
          border: ${props.isFile ? "unset" : "solid 1px #dbdbdb"};
        }
        & > button {
          background-color: ${props.isFile ? "#007fff" : "#dbdbdb;"};
        }
      }
    `;
  }}
`;
function Install() {
  const dispatch = useDispatch();
  const [File, setFile] = useState(undefined);

  const __upload = useCallback(() => {
    if (File.type) {
      dispatch({
        type: "@config/isLoading",
        payload: true,
      });
      Fstorage.ref("/pos")
        .put(File)
        .then((res) => {
          res.ref.getDownloadURL().then((url) => {
            Fstore.collection("config")
              .doc("pos")
              .set({
                name: File.name,
                url,
                time: Date.now(),
              })
              .then(() => {
                setFile({ name: File.name, url, time: Date.now() });
                dispatch({
                  type: "@config/TOAST",
                  payload: {
                    isactive: true,
                    msg: "파일을 업로드하였습니다.",
                  },
                });
                dispatch({
                  type: "@config/isLoading",
                  payload: false,
                });
              })
              .catch((err) => {
                dispatch({
                  type: "@config/TOAST",
                  payload: {
                    isactive: true,
                    msg: `에러코드 ${err.code}`,
                  },
                });
                dispatch({
                  type: "@config/isLoading",
                  payload: true,
                });
              });
          });
        });
    }
  }, [File, dispatch]);
  useEffect(() => {
    Fstore.collection("config")
      .doc("pos")
      .get()
      .then((res) => {
        if (res.exists) {
          const val = res.data();
          setFile(val);
        }
      });
    return () => {};
  }, []);
  return (
    <Wrapper isFile={File}>
      <div className="title">설치프로그램관리</div>
      <div className="upload-box">
        <div className="title">
          파일 업로드
          {File && File.time ? (
            <span>{formatDate(File.time, ".")} 업로드됨</span>
          ) : undefined}
        </div>
        <label className="file-insert">
          <img
            src={`/assets/editor/${File ? "blue-" : ""}document.svg`}
            alt="insert"
          />
          <div
            className="insert-title"
            style={File ? { color: "#3597ec" } : undefined}
          >
            {File ? `${File.name}` : "파일을 선택 또는 드래그해주세요"}
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </label>
        <button onClick={__upload}>등록하기</button>
      </div>
    </Wrapper>
  );
}

export default Install;
