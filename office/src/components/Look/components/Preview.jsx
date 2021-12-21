import React from "react";
import styled from "styled-components";
import DisplayImage from "./DisplayImage";

function Preview({ list, __preview }) {
  const Wrapper = styled.div`
    z-index: 9000;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    & > .back {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #f7f8fa;
    }
    & > figure {
      z-index: 9800;
      cursor: pointer;
      width: 24px;
      height: 24px;
      position: absolute;
      right: 30px;
      top: 30px;
      & > img {
        cursor: pointer;
      }
    }
    .list-wrapper {
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 9500;
      padding-top: 190px;
      display: grid;
      grid-template-columns: 321px 321px 321px;
      row-gap: 39px;
      column-gap: 15px;
      & > a {
        width: 321px;
        height: 408px;
        background-color: white;
        padding: 25px 23px 22.3px 23px;
        box-sizing: border-box;
        border-radius: 10px;
        & > .category {
          font-size: 13px;
          font-weight: bold;
          color: #007fff;
        }
        & > .title {
          font-size: 22px;
          font-weight: bold;
          color: #191f28;
          white-space: pre-wrap;
          height: 63px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 6px;
          margin-bottom: 8px;
        }
        & > .content {
          white-space: pre-wrap;
          font-size: 13px;
          line-height: 1.54;
          color: #191f28;
          height: 59px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  `;
  return (
    <Wrapper>
      <div className="back" />
      <figure
        onClick={() => {
          __preview(false);
        }}
      >
        <img src="/assets/popup/cancel.svg" alt="" />
      </figure>
      <div className="list-wrapper">
        {list.map(({ link, title, category, content, image }, idx) => {
          return image.url ? (
            <a key={idx} target="_blank" rel="noopener noreferrer" href={link}>
              <div className="category">{category}</div>
              <div className="title">{title}</div>
              <div className="content">{content}</div>
              <DisplayImage content={image} />
            </a>
          ) : (
            <></>
          );
        })}
      </div>
    </Wrapper>
  );
}

export default Preview;
