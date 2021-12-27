import React from "react";
import styled, { css } from "styled-components";
import { Animation } from "../../styles/Animation";
import InputWrapper from "./InputWrapper";
const layout = [
  {
    title: "카테고리",
    type: "category",
    placeholder: "카테고리 입력",
    patcher: "CATEGORY",
  },
  {
    title: "제목",
    sub: "2줄 권장 / 개행 가능",
    type: "title",
    placeholder: "제목을 입력해주세요",
    patcher: "TITLE",
  },
  {
    title: "내용",
    sub: "3줄 권장 / 개행 가능",
    type: "content",
    placeholder: "내용을 입력해주세요",
    patcher: "CONTENT",
  },
  {
    title: "링크",
    type: "link",
    placeholder: "링크 입력",
    patcher: "LINK",
  },
];

const Card = styled.div`
  width: 100%;
  height: 532px;
  border-radius: 10px;
  border: solid 1px #dbdbdb;
  background-color: white;
  padding: 17px 68px 41px 26px;
  box-sizing: border-box;
  position: relative;
  & > .cancel {
    cursor: pointer;
    position: absolute;
    top: 15.5px;
    right: 15.5px;
    & > figure {
      width: 20px;
      height: 20px;
      background-color: white;
    }
  }
  & > .title {
    font-size: 20px;
    font-weight: bold;
    color: #007fff;
    margin-bottom: 19px;
  }
  & > .insert-wrapper {
    display: flex;
    & > .left {
      width: 467px;
      display: grid;
      row-gap: 24px;
    }
    & > .right {
      margin-left: 36px;
      & > .title {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 6px;
      }
      & > label {
        cursor: pointer;
        width: 396px;
        height: 262px;
        background-color: #f8f8f8;
        border-radius: 5px;
        border: solid 1px #dbdbdb;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        & > input {
          position: absolute;
          top: 0;
          left: 0;
        }
        & > figure {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          & > figcaption {
            font-size: 14px;
            font-weight: 500;
            color: #a8a8a8;
            margin-top: 9px;
          }
        }
      }
    }
  }
  ${(props) => {
    return css`
      & > .insert-wrapper {
        & > .right {
          & > label {
            & > figure {
              & > img {
                width: ${props.isImage ? "396px" : "67px"};
                height: ${props.isImage ? "262px" : "66px"};
              }
            }
          }
        }
      }
    `;
  }}
`;
function LookCard({ index, data, imageupload, displayIndex, remove }) {
  return (
    <Animation>
      <Card isImage={data.image.url ? true : false}>
        <button
          className="cancel"
          onClick={() => {
            remove(index, data.image.url, data.image.resize);
          }}
        >
          <figure>
            <img src="/assets/question/cancel.svg" alt="" />
          </figure>
        </button>
        <div className="title">미리보기{displayIndex}</div>
        <div className="insert-wrapper">
          <div className="left">
            {layout.map((item, idx) => {
              return (
                <InputWrapper
                  key={idx}
                  data={item}
                  index={index}
                  content={data[item.type]}
                />
              );
            })}
          </div>
          <div className="right">
            <div className="title">썸네일 이미지</div>
            <label>
              <input
                type="file"
                style={{ opacity: 0 }}
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => {
                  if (data.image && data.image.url.substr(0, 4) !== "data") {
                    imageupload(e, index, data.image.url, data.image.resize);
                  } else {
                    imageupload(e, index);
                  }
                }}
              />
              <figure>
                {data.image.url ? (
                  <img src={data.image.url} alt="" />
                ) : (
                  <>
                    <img src="/assets/common/add.svg" alt="" />
                    <figcaption>사진을 업로드해주세요 ( jpeg, png )</figcaption>
                  </>
                )}
              </figure>
            </label>
          </div>
        </div>
      </Card>
    </Animation>
  );
}

export default LookCard;
