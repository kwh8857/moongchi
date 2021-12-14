import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PosPopup from "../Posdown/components/PosPopup";
import AskPopup from "../Ask/components/AskPopup";
const Wrapper = styled.section`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  z-index: 9500;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .back {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
  }
  & > .box {
    width: 502px;
    height: 366px;
    animation: fadeIn 0.4s;
    position: relative;
    z-index: 200;
    border-radius: 13px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 54.2px;
    box-sizing: border-box;
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
  }
`;
function Popup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ispos, id, type, password } = useSelector(
    (state) => state.config.popup
  );
  const __navMain = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return ispos ? (
    <Wrapper>
      <div className="back" />
      {type === "pos" ? (
        <PosPopup __navMain={__navMain} />
      ) : (
        <AskPopup id={id} confirm={password} />
      )}
    </Wrapper>
  ) : (
    <></>
  );
}

export default Popup;
