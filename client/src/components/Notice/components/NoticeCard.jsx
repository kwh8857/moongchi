import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  border-bottom: solid 1px #dbdbdb;
  padding-left: 31px;
  padding-right: 22px;
  box-sizing: border-box;
  white-space: nowrap;
  cursor: pointer;
  & > .left {
    display: flex;
    align-items: center;
    & > .number {
      width: 18px;
      font-size: 15px;
      font-weight: bold;
      color: #007fff;
      margin-right: 61px;
    }
    & > .title {
      font-size: 15px;
      font-weight: bold;
      display: flex;
      align-items: center;
      & > .text {
        max-width: 700px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & > .icon {
        margin-left: 8px;
        display: flex;
        align-items: center;
        & > figure {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    height: 99px;
    padding-left: 32px;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    & > .left {
      flex-direction: column;
      align-items: flex-start;
      & > .number {
        font-size: 14px;
        width: fit-content;
        margin-right: 0;
      }
      & > .title {
        & > .text {
          max-width: 530px;
        }
      }
    }
    & > .right {
      margin-top: 5px;
      font-size: 13px;
      font-weight: bold;
      color: #989898;
    }
  }
  @media screen and (max-width: 769px) {
    & > .left {
      & > .title {
        & > .text {
          max-width: 190px;
        }
      }
    }
  }
  ${(props) => {
    return css`
      background-color: ${props.isPin ? "#f7f8fa" : "white"};
    `;
  }}
`;
function NoticeCard({
  data: {
    title,
    config: { isPin },
    template,
    id,
  },
  type,
  index,
}) {
  const navigate = useNavigate();
  const isFile = template.filter((item) => item.type === "FILE");
  return (
    <Card
      isPin={isPin}
      onClick={() => {
        navigate(`/detail/${type}/${id}`);
      }}
    >
      <div className="left">
        <div className="number">{index}</div>
        <div className="title">
          <div className="text">{title}</div>
          <div className="icon">
            {isFile.length > 0 ? (
              <figure>
                <img src="/assets/common/file.svg" alt="file" />
              </figure>
            ) : undefined}
            {isPin ? (
              <figure>
                <img src="/assets/common/pin.svg" alt="" />
              </figure>
            ) : undefined}
          </div>
        </div>
      </div>
      <div className="right">2021.1.23</div>
    </Card>
  );
}

export default NoticeCard;
