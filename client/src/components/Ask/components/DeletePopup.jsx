import React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import firebaseApp from "../../config/firebaseApp";

const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();
const Box = styled.div`
  width: 502px;
  height: 286px;
  position: relative;
  z-index: 200;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 54.2px;
  box-sizing: border-box;
  border-radius: 13px;
  & > .cancel {
    cursor: pointer;
    position: absolute;
    top: 24.2px;
    right: 22.5px;
    width: 21.7px;
    height: 21.7px;
    & > figure {
      background-color: white;
    }
  }
  & > .title {
    font-size: 27px;
    font-weight: bold;
    color: #191f28;
  }
  & > .sub {
    margin-top: 14px;
    margin-bottom: 33px;
    font-size: 16px;
    line-height: 1.69;
    color: #191f28;
  }
  & > .send {
    cursor: pointer;
    width: 249px;
    height: 54px;
    border-radius: 57px;
    background-color: #007fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  @media screen and (max-width: 1024px) {
    width: 320px;
    height: 241px;
    padding-top: 49px;
    & > .cancel {
      width: 18.3px;
      height: 18.3px;
      top: 18px;
      right: 18.7px;
    }
    & > .title {
      font-size: 22px;
      margin-top: 13.2px;
    }
    & > .sub {
      font-size: 14px;
      margin-top: 11px;
      margin-bottom: 30px;
      line-height: 1.57;
    }
    & > .send {
      width: 209px;
      height: 46px;
      font-size: 15px;
      justify-content: center;
    }
  }
`;
function DeletePopup({ agent, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const __remove = useCallback(() => {
    Fstore.collection("ask")
      .doc(id)
      .get()
      .then((res) => {
        const value = res.data();
        value.template.forEach(({ type, content }) => {
          if (type === "image") {
            Fstorage.refFromURL(content.url).delete();
            Fstorage.refFromURL(content.resize).delete();
          }
        });
        if (value.answer && value.answer.image) {
          Fstorage.refFromURL(value.answer.image.url).delete();
          Fstorage.refFromURL(value.answer.image.resize).delete();
        }
        res.ref.delete();
        dispatch({
          type: "POPUP",
          payload: {
            isactive: false,
            type: "",
            id: "",
            password: "",
          },
        });
        navigate("/ask");
      });
  }, [dispatch, navigate, id]);
  return (
    <Box>
      <button
        className="cancel"
        onClick={() => {
          dispatch({
            type: "POPUP",
            payload: {
              isactive: false,
              type: "",
              id: "",
              password: "",
            },
          });
        }}
      >
        <figure>
          <img src="/assets/down/cancel.svg" alt="" />
        </figure>
      </button>
      <div className="title">게시글을 삭제하겠습니까?</div>
      <div className="sub">
        게시글을 삭제하시겠습니까? <br /> 삭제된 게시물은 다시 복구할 수
        없습니다
      </div>
      <button className="send" onClick={__remove}>
        <div>삭제하기</div>
      </button>
    </Box>
  );
}

export default DeletePopup;
