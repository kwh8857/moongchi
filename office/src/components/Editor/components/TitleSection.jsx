import React from "react";

import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 1024px;
  margin-bottom: 27.5px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 30px;
      font-weight: bold;
    }
    & > .right {
      display: flex;

      & > .pin {
        cursor: pointer;
        margin-right: 19px;
        width: 50px;
        height: 50px;
        border-radius: 5px;
        transition: background-color 0.2s ease-in-out;
        & > figure {
          & > img {
            width: 17.6px;
            height: 26px;
          }
        }
      }
      .btn {
        width: 148px;
        height: 50px;
        cursor: pointer;
        border-radius: 5px;
        color: white;
        font-size: 19px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .ti {
    font-size: 19px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 9px;
  }
  input {
    width: 100%;
    height: 50px;
    border: solid 1px #dbdbdb;
    border-radius: 5px;
    font-size: 17px;
    box-sizing: border-box;
    padding: 12px 17px;
  }
  textarea {
    width: 100%;
    height: 80px;
    border: solid 1px #dbdbdb;
    border-radius: 5px;
    font-size: 17px;
    box-sizing: border-box;
    padding: 12px 17px;
  }
  ${(props) => {
    return css`
      .top {
        & > .right {
          & > .pin {
            border: ${props.isPin ? "solid 1px #007fff" : "solid 1px #dbdbdb"};
            background-color: ${props.isPin ? "#e6efff" : "white"};
          }
        }
      }
    `;
  }}
`;

function TitleSection({ dispatch, info: { title, isPin }, insert }) {
  return (
    <Wrapper isPin={isPin}>
      <div className="top">
        <div className="title">게시글 추가</div>
        <div className="right">
          <button
            className="pin"
            onClick={() => {
              dispatch({
                type: "PIN",
                isPin: !isPin,
              });
            }}
          >
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.646"
                height="26.001"
                viewBox="0 0 17.646 26.001"
              >
                <path
                  d="m22.489 21.1-8.678-5.01a2.226 2.226 0 1 0-2.227 3.856l8.677 5.01a2.227 2.227 0 0 0 2.228-3.856zm-7.157-5.418 6.75 3.9 2.3-6.389-4.665-2.693-4.385 5.182zM10.356 32.1l6.457-7.843-2.893-1.67-3.564 9.513zm16.81-22.439L21.382 6.32a1.67 1.67 0 0 0-1.67 2.893l5.785 3.34a1.67 1.67 0 1 0 1.669-2.893z"
                  transform="translate(-10.356 -6.096)"
                  style={{ fill: isPin ? "#007fff" : "#a8a8a8" }}
                />
              </svg>
            </figure>
          </button>
          <div
            className="btn"
            style={{
              backgroundColor: title ? "#007fff" : "#7c7c7c",
            }}
            onClick={() => {
              insert();
            }}
          >
            등록
          </div>
        </div>
      </div>

      <div className="ti">게시글 제목</div>
      <input
        value={title ? title : ""}
        type="text"
        maxLength={60}
        placeholder="게시글 제목을 입력해주세요"
        onChange={(e) => {
          if (e.target.value) {
            dispatch({
              type: "TITLE",
              title: e.target.value,
            });
          } else {
            dispatch({
              type: "TITLE",
              title: undefined,
            });
          }
        }}
      />
    </Wrapper>
  );
}

export default TitleSection;
