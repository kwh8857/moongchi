import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import firebaseApp from "../../config/firebaseApp";

const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();

const Btn = styled.button`
  cursor: pointer;
  width: 148px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 19px;
  font-weight: bold;

  @media screen and (max-width: 1024px) {
    width: 96px;
    height: 36px;
    font-size: 14px;
  }
  @media screen and (max-width: 769px) {
    width: 320px;
    height: 50px;
    border-radius: 6px;
    position: fixed;
    bottom: 24px;
    margin: 0 auto;
  }
  ${(props) => {
    console.log(props);
    return css`
      background-color: ${props.isOn ? "#007fff" : "#dbdbdb"};
    `;
  }}
`;

const Init = styled.button`
  width: 96px;
  height: 36px;
  background-color: #007fff;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

function InitBtn({ useragent, setStep, isInit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screen = useSelector((state) => state.database.editor);
  const { title, name, password, tel } = useSelector(
    (state) => state.database.ask
  );
  const [isOn, setIsOn] = useState(false);

  const __storageInit = useCallback((url, resize, id) => {
    return new Promise((resolve, reject) => {
      const data = url.split(",")[1];
      const redata = resize.split(",")[1];
      Fstorage.ref(`ask/${id}`)
        .putString(data, "base64", {
          contentType: "image/jpeg",
        })
        .then((result) => {
          result.ref.getDownloadURL().then((downloadUrl) => {
            Fstorage.ref(`ask/${id}-resize`)
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
    });
  }, []);

  const __updateAsk = useCallback(() => {
    dispatch({
      type: "LOADING",
      payload: true,
    });
    const template = screen.slice();
    Promise.all(
      template.map((item, idx) => {
        if (item.type === "IMAGE") {
          const {
            content: { url, resize },
            id,
            width,
            height,
            type,
          } = item;
          const result = __storageInit(url, resize, id).then(
            ({ url, resize }) => {
              return {
                type,
                content: {
                  url,
                  resize,
                },
                width,
                height,
                id,
              };
            }
          );
          return result;
        } else {
          return item;
        }
      })
    ).then((result) => {
      Fstore.collection("ask")
        .add({
          title,
          name,
          password: parseInt(password),
          tel,
          timestamp: Date.now(),
          status: false,
          template: result,
        })
        .then(() => {
          dispatch({
            type: "@layouts/RESET",
          });
          dispatch({
            type: "LOADING",
            payload: false,
          });
          navigate(-1);
        });
    });
  }, [title, name, password, tel, screen, __storageInit, dispatch, navigate]);

  useEffect(() => {
    if (title && name && password.length === 4 && tel.length === 13) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
    return () => {};
  }, [title, name, password, tel]);
  return isInit ? (
    <Init
      onClick={() => {
        __updateAsk();
      }}
    >
      등록
    </Init>
  ) : (
    <Btn
      isOn={isOn}
      isInit={isInit}
      onClick={() => {
        if (isOn) {
          if (useragent !== "mobile") {
            __updateAsk();
          } else {
            setStep(true);
            document.getElementById("root").scrollTo(0, 0);
          }
        }
      }}
    >
      {useragent === "mobile" ? "문의내용 작성하기" : "등록"}
    </Btn>
  );
}

export default InitBtn;
