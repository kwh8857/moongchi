import React from "react";
import { useState } from "react";

function Box({ data: { title, content, link, id }, index, __setDate }) {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <div className="box">
      <button
        className="cancel"
        onClick={() => {
          __setDate(id, isCheck, index);
        }}
      >
        <figure>
          <img src="/assets/down/cancel.svg" alt="" />
        </figure>
      </button>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
      <a
        href={link}
        target={"_blank"}
        rel="noreferrer"
        onClick={() => {
          __setDate(id, isCheck, index);
        }}
      >
        자세히보기
      </a>
      <div className="check">
        <button
          style={{ border: isCheck ? "unset" : "solid 1px #dbdbdb" }}
          onClick={() => {
            setIsCheck(!isCheck);
          }}
        >
          {isCheck ? (
            <img src="/assets/main/blue-check.svg" alt="" />
          ) : undefined}
        </button>
        <div className="check-title">오늘 하루동안 보지 않기</div>
      </div>
    </div>
  );
}

export default Box;
