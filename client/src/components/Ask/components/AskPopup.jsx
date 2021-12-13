import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Box = styled.div`
  & > input {
    width: 310px;
    height: 50px;
    border-radius: 5px;
    border: solid 1px #dbdbdb;
    font-size: 16px;
    padding: 0 17px;
    box-sizing: border-box;
  }
  & > figure {
    width: 50px;
    height: 57.1px;
  }
  & > .title {
    font-size: 27px;
    font-weight: bold;
    color: #191f28;
    margin-top: 14px;
    margin-bottom: 18px;
  }
`;

const Init = styled.button`
  cursor: pointer;
  margin-top: 30px;
  width: 249px;
  height: 54px;
  border-radius: 57px;
  color: white;
  font-size: 18px;
  font-weight: bold;

  ${(props) => {
    return css`
      background-color: ${props.isOn ? "#007fff" : "#dbdbdb"};
    `;
  }}
`;

function AskPopup({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const __navDetail = useCallback(() => {
    if (password.length === 4) {
      navigate(`/detail/ask/${id}`);
      dispatch({
        type: "POPUP",
        payload: {
          ispos: false,
          type: "",
          id: "",
        },
      });
    }
  }, [password, id]);
  return (
    <Box className="box">
      <button
        className="cancel"
        onClick={() => {
          dispatch({
            type: "POPUP",
            payload: {
              ispos: false,
              type: "",
              id: "",
            },
          });
        }}
      >
        <figure>
          <img src="/assets/down/cancel.svg" alt="" />
        </figure>
      </button>
      <figure>
        <img src="/assets/ask/blue-lock.svg" alt="" />
      </figure>
      <div className="title">게시글 암호 임력</div>
      <input
        type="password"
        placeholder="암호 4자리 입력"
        maxLength={4}
        value={password}
        onChange={(e) => {
          const number = e.target.value.replace(/[^0-9-]/gi, "");
          setPassword(number);
        }}
      />
      <Init isOn={password.length === 4 ? true : false} onClick={__navDetail}>
        확인
      </Init>
    </Box>
  );
}

export default AskPopup;
