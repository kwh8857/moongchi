import React from "react";
import TemplateEmty from "./TemplateEmty";

function TemplateLink({ data, idx, provided, type, template, __delete }) {
  const { title, url } = data;
  return (
    <>
      {idx === 0 ? <TemplateEmty idx={idx} /> : undefined}
      <div
        className="link-template"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <figure
          className="delete-btn"
          onClick={() => {
            if (type === "FILE") {
              __delete(url, type, idx, { content: data, type });
            } else {
              __delete(idx);
            }
          }}
        >
          <img src="/assets/common/delete.svg" alt="" />
        </figure>
        <img
          src={`/assets/editor/${type === "LINK" ? "blue-link" : "down"}.svg`}
          alt="링크"
          className={`${type === "LINK" ? "link" : "file"}-asset`}
        />
        <div className="link-title">{title}</div>
        {type === "LINK" ? (
          <img
            className="link-play"
            src="/assets/editor/blue-play.svg"
            alt="play"
          />
        ) : undefined}
      </div>
      {!template[idx + 1] || template[idx + 1].type !== "TITLE" ? (
        <TemplateEmty idx={idx + 1} />
      ) : undefined}
    </>
  );
}

export default TemplateLink;
