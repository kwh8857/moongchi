import React from 'react';
import styled, { css } from 'styled-components';

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
    .btn-wrapper {
      display: grid;
      column-gap: 12px;
      ${(props) =>
        props.category === 'community'
          ? props.state === 'new'
            ? css`
                grid-template-columns: repeat(2, 120px);
              `
            : css`
                grid-template-columns: repeat(1, 120px);
              `
          : props.state === 'new'
          ? css`
              grid-template-columns: repeat(3, 120px);
            `
          : css`
              grid-template-columns: repeat(2, 120px);
            `}
      & > div {
        height: 44px;
        border-radius: 5px;
        width: 100%;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .save {
        color: #898989;
        border: solid 1px #898989;
      }
      .back {
        img {
          width: 6px;
          height: 10px;
          margin-right: 13px;
        }
        color: #9b1ce1;
        border: solid 1px #9b1ce1;
      }
      .btn {
        color: white;
      }
    }
  }
  .cm-title {
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
  @media screen and (max-width: 538px) {
    width: 100%;
    .cm-title {
      transition: top 0.2s ease-in-out;
      z-index: 500;
      right: 0;
      position: fixed;
      top: 58px;
      width: 100%;
      display: flex;
      height: 72.5px;
      background-color: white;
      justify-content: center;
      box-sizing: border-box;
      padding-top: 10px;
      .input-wrapper {
        position: relative;
        width: 330px;
        input {
          width: 329px;
          height: 42px;
          font-size: 13px;
          box-sizing: border-box;
          padding-right: 45px;
        }
        ::placeholder {
          font-size: 13px;
        }
        .length {
          position: absolute;
          right: 10px;
          top: 11px;
          font-size: 13px;
          color: #9a9a9a;
        }
      }
    }
  }
`;

function TitleSection({ category, dispatch, info: { title }, post, state, isBack, __save, agent }) {
  return (
    <Wrapper category={category} state={state} agent={agent}>
      {agent !== 'mobile' ? (
        <div className="top">
          <div className="title">게시물 작성하기</div>
          <div className="btn-wrapper">
            {state === 'new' ? (
              <div className="save" onClick={__save}>
                임시저장
              </div>
            ) : undefined}
            {category !== 'community' ? (
              <div
                className="back"
                onClick={() => {
                  isBack(false);
                }}
              >
                <img src="/assets/editor/p-left.svg" alt="" />
                이전으로
              </div>
            ) : undefined}
            <div
              className="btn"
              style={{
                backgroundColor: title || category !== 'community' ? '#9b1ce1' : '#7c7c7c'
              }}
              onClick={() => {
                if (title || category !== 'community') {
                  post();
                }
              }}
            >
              {state === 'new' || state === 'save' ? '등록' : '수정'}
            </div>
          </div>
        </div>
      ) : undefined}
      {category === 'community' ? (
        <div className="cm-title">
          <div className="input-wrapper">
            {agent !== 'mobile' ? <div className="ti">게시글 제목</div> : undefined}
            <input
              value={title ? title : ''}
              type="text"
              maxLength={60}
              placeholder={
                agent === 'mobile'
                  ? '제목을 입력해주세요 (60자 이내)'
                  : '게시글 제목을 입력해주세요'
              }
              onChange={(e) => {
                if (e.target.value) {
                  dispatch({
                    type: 'TITLE',
                    title: e.target.value
                  });
                } else {
                  dispatch({
                    type: 'TITLE',
                    title: undefined
                  });
                }
              }}
            />
            {agent === 'mobile' ? (
              <div className="length">{title ? title.length : 0}/60</div>
            ) : undefined}
          </div>
        </div>
      ) : undefined}
    </Wrapper>
  );
}

export default TitleSection;
