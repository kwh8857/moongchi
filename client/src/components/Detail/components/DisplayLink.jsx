import React from "react";
import styled, { css } from "styled-components";
const Dlink = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  background-color: #f7f8fa;
  border-radius: 5px;
  margin: 25px 0;
  border-radius: 5px;
  height: 53px;
  width: 100%;
  cursor: pointer;
  .asset-link {
    height: 12.3px;
    margin-left: 15px;
    display: flex;
    align-items: center;
  }

  .title {
    text-align: left;
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
  return (
    <Dlink
      type={type}
      onClick={() => {
        if (type === "FILE") {
          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            var blob = URL.createObjectURL(xhr.response);
            var link = document.createElement("a");
            link.href = blob;
            link.download = title;
            document.body.appendChild(link);
            link.click();
            link.remove();
          };
          xhr.open("GET", url);
          xhr.send();
        } else {
          var link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.click();
          link.remove();
        }
      }}
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
