import React from 'react';
import TemplateEmty from './TemplateEmty';
function TemplateImage({
  data: { resize, url },
  provided,
  setFocus,
  focusIdx,
  idx,
  template,
  __remove
}) {
  return (
    <>
      {idx === 0 ? <TemplateEmty idx={idx} /> : undefined}
      <div
        className={`template-img ${focusIdx === idx ? 'active-blue' : ''}`}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={() => {
          setFocus(idx);
        }}
      >
        <div
          className={`remove-btn`}
          onClick={() => {
            __remove(idx, resize, url);
          }}
        >
          <img src="/assets/editor/delete.svg" alt="삭제하기" />
        </div>
        <img src={url} alt="이미지" />
      </div>
      {!template[idx + 1] || template[idx + 1].type !== 'TITLE' ? (
        <TemplateEmty idx={idx + 1} />
      ) : undefined}
    </>
  );
}

export default TemplateImage;
