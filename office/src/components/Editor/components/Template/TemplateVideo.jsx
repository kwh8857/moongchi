import React from "react";
import TemplateEmty from "./TemplateEmty";

function TemplateVideo({ data, provided, template, idx, setFocus, __delete }) {
  return (
    <>
      {idx === 0 ? <TemplateEmty idx={idx} /> : undefined}
      <div
        className="template-video"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={() => {
          setFocus(idx);
        }}
      >
        <figure
          className="delete-btn"
          onClick={() => {
            __delete(idx);
          }}
        >
          <img src="/assets/common/delete.svg" alt="" />
        </figure>
        <div className="dnd-icon">
          <img
            src="/assets/projects/dnd-icon.svg"
            alt="원하는 위치로 이동해보세요!"
          />
        </div>
        <video src={data} controls></video>
      </div>
      {!template[idx + 1] || template[idx + 1].type !== "TITLE" ? (
        <TemplateEmty idx={idx + 1} />
      ) : undefined}
    </>
  );
}

export default TemplateVideo;
