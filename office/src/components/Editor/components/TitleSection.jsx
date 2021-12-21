import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

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
`;

function TitleSection({ dispatch, info: { title }, insert }) {
  const history = useHistory();
  return (
    <Wrapper>
      <div className="top">
        <div className="title">게시글 추가</div>
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
