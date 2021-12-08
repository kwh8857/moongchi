import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import List from "../common/List";
import Search from "../common/Search";

const arr = [
  {
    title: "뭉치 업데이트 vol.3.1.1",
    timestamp: Date.now(),
    view: 0,
    templates: [],
    isPin: true,
    isFile: true,
  },
  {
    title: "뭉치 업데이트 vol.3.1.1",
    timestamp: Date.now(),
    view: 0,
    templates: [],
    isPin: true,
    isFile: false,
  },
  {
    title: "뭉치 업데이트 vol.3.1.1",
    timestamp: Date.now(),
    view: 0,
    templates: [],
    isPin: false,
    isFile: true,
  },
  {
    title: "뭉치 업데이트 vol.3.1.1",
    timestamp: Date.now(),
    view: 0,
    templates: [],
    isPin: false,
    isFile: false,
  },
  {
    title: "뭉치 업데이트 vol.3.1.1",
    timestamp: Date.now(),
    view: 0,
    templates: [],
    isPin: false,
    isFile: false,
  },
  {
    title: "뭉치 업데이트 vol.3.1.1",
    timestamp: Date.now(),
    view: 0,
    templates: [],
    isPin: false,
    isFile: false,
  },
];

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 151px;
  & > .container {
    & > .pager-wrapper {
      margin-top: 102px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > figure {
        width: 7px;
        height: 13px;
        cursor: pointer;
      }
      & > .pages {
        display: grid;
        margin: 0 28.5px;
        column-gap: 4px;
        & > div {
          cursor: pointer;
          width: 30px;
          height: 29px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
        }
        & > .now {
          background-color: #007fff;
          color: white;
        }
        & > .next {
          color: #434343;
          border: solid 1px #dbdbdb;
        }
      }
    }
  }
  ${(props) => {
    return css`
      .pages {
        grid-template-columns: ${props.isNext ? "29px 29px" : "29px"};
      }
    `;
  }}
`;

function Blog() {
  const length = parseFloat(String(arr.length / 10));
  const [now, setNow] = useState(1);
  const __changePage = useCallback(
    (type) => {
      if (type === "next") {
        setNow(now + 1);
      } else if (now !== 1) {
        setNow(now - 1);
      }
    },
    [now]
  );
  return (
    <Wrapper>
      <Search type="blog" />
      <div className="container">
        <List type="blog" data={arr} />
        <div className="pager-wrapper">
          <figure
            onClick={() => {
              __changePage("befor");
            }}
          >
            <img src="/assets/common/left-arrow.svg" alt="" />
          </figure>
          <div className="pages">
            {now > length && length >= 1 ? (
              <div
                className="next"
                onClick={() => {
                  __changePage("befor");
                }}
              >
                {now - 1}
              </div>
            ) : undefined}
            <div className="now">{now}</div>
            {length !== 0 && now < length ? (
              <div
                className="next"
                onClick={() => {
                  __changePage("next");
                }}
              >
                {now + 1}
              </div>
            ) : undefined}
          </div>
          <figure
            onClick={() => {
              __changePage("next");
            }}
          >
            <img src="/assets/common/right-arrow.svg" alt="" />
          </figure>
        </div>
      </div>
    </Wrapper>
  );
}

export default Blog;
