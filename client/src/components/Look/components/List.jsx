import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import firebaseApp from "../../config/firebaseApp";

const Fstore = firebaseApp.firestore();
const Wrapper = styled.section`
  padding-top: 254px;
  & > .container {
    display: grid;
    grid-template-columns: repeat(3, 321px);
    column-gap: 15px;
    row-gap: 39px;
    & > .card {
      width: 100%;
      height: 408px;
      border-radius: 10px;
      background-color: white;
      padding: 25px 23px 22.3px 23px;
      box-sizing: border-box;
      & > .tag {
        font-size: 13px;
        font-weight: bold;
        color: #007fff;
        height: 19px;
      }
      & > .title {
        font-size: 22px;
        font-weight: bold;
        color: #191f28;
        line-height: 1.36;
        white-space: pre-wrap;
        margin-top: 6px;
        margin-bottom: 8px;
        height: 63px;
      }
      & > .sub {
        white-space: pre-wrap;
        font-size: 13px;
        line-height: 1.54;
        color: #191f28;
        height: 59px;
      }
      & > .image {
        cursor: pointer;
        margin-top: 24px;
        width: 100%;
        height: 181.6px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: relative;
        & > figure {
          position: absolute;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.3);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          & > img {
            width: 56px;
            height: 56px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    & > .container {
      grid-template-columns: repeat(2, 321px);
      row-gap: 30px;
      column-gap: 16px;
    }
  }
`;
function List() {
  const [preview, setPreview] = useState([]);
  useEffect(() => {
    Fstore.collection("config")
      .doc("preview")
      .get()
      .then((res) => {
        const arr = res.data().list;
        const filt = arr.filter((item) => item.image.url);
        setPreview(filt);
      });
    return () => {};
  }, []);
  return (
    <Wrapper>
      <div className="container">
        {preview.map(({ category, title, content, image, link }, idx) => {
          return (
            <div key={idx} className="card">
              <div className="tag">{category}</div>
              <div className="title">{title}</div>
              <div className="sub">{content}</div>
              <a
                href={link}
                className="image"
                rel="noopeenr"
                target={"_blank"}
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <figure>
                  <img src="/assets/look/play.svg" alt="" />
                </figure>
              </a>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

export default List;
