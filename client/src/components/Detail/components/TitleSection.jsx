import React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { formatDate } from "../../lib/factory";

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 25px;
  border-bottom: solid 1px #bfbfbf;
  & > .type {
    font-size: 15px;
    font-weight: bold;
    color: #007fff;
  }
  & > .title {
    margin-top: 8px;
    font-size: 33px;
    font-weight: bold;
    margin-bottom: 19px;
  }
  & > .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    color: #7c7c7c;
    & > .remove {
      background-color: white;
      cursor: pointer;
      & > figure {
        width: 28px;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    & > .bottom {
      & > .remove {
        & > figure {
          width: 22px;
        }
      }
    }
  }
`;

function TitleSection({ title, type, timestamp, view, id }) {
  const dispatch = useDispatch();
  const __remove = useCallback(() => {
    dispatch({
      type: "POPUP",
      payload: {
        id,
        isactive: true,
        type: "delete",
      },
    });
  }, [dispatch, id]);
  return (
    <Wrapper>
      <div className="type">{type === "ask" ? "고객문의" : ""}</div>
      <div className="title">{title}</div>
      <div className="bottom">
        <div className="timestamp">{formatDate(timestamp, ".")}</div>
        {type === "ask" ? (
          <button className="remove" onClick={__remove}>
            <figure>
              <img src="/assets/ask/delete.svg" alt="삭제" />
            </figure>
          </button>
        ) : (
          <div className="view">조회수 {view}</div>
        )}
      </div>
    </Wrapper>
  );
}

export default TitleSection;
