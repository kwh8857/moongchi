import React from "react";
import styled, { css } from "styled-components";
const Dlink = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  background-color: #f7f8fa;
  border-radius: 5px;
  margin: 25px 0;
  border-radius: 5px;
  height: 53px;
  width: 100%;

  .asset-link {
    height: 12.3px;
    margin-left: 15px;
    display: flex;
    align-items: center;
  }

  .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 85%;
    color: #007fff;
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
  }

  .asset-arrow {
    position: absolute;
    right: 15px;
    width: 7px;
    display: flex;
    align-items: center;
  }
  ${(props) => {
    return css`
      & > .asset-link {
        width: ${props.type === "LINK" ? "24.5px" : "14.5px"};
        height: ${props.type === "LINK" ? "12.3px" : "17.6px"};
      }
        @media screen and (max-width: 769px) {
           & > .asset-link {
        width: ${props.type === "LINK" ? "24.5px" : "14.5px"};
        h
        }
    `;
  }}
`;
function DisplayLink({ content: { url, title }, type }) {
  console.log(url);
  return (
    <Dlink
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      type={type}
      attributes-list
      download
    >
      <div className="asset-link">
        <img
          src={`/assets/common/${type === "LINK" ? "link" : "blue-down"}.svg`}
          alt=""
        />
      </div>
      <div className="title txt-bold">{title}</div>
      {type === "LINK" ? (
        <div className="asset-arrow">
          <img src="/assets/common/blue-play.svg" alt="" />
        </div>
      ) : undefined}
    </Dlink>
  );
}

export default DisplayLink;
