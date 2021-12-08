import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const mbinner = window.innerHeight;
const agent = navigator.userAgent;
function TemplateTitle({ data, idx, provided, setFocus }) {
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.test.editor);
  useEffect(() => {
    contentRef.current.innerHTML = data;
    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      id={`popo-${idx}`}
      className="template-title"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="dnd-icon" style={{ top: '-13px' }}>
        <img src="/assets/projects/dnd-icon.svg" alt="원하는 위치로 이동해보세요!" />
      </div>
      <div className="con-wrapper">
        <p
          placeholder="내용을 입력해주세요"
          id="text-line"
          contentEditable={true}
          ref={contentRef}
          suppressContentEditableWarning={true}
          onFocus={() => {
            if (agent.match(/iPhone/i)) {
              setTimeout(() => {
                const ref = document.getElementsByClassName('edit-header');
                const mbgrey = document.getElementsByClassName('mb-grey');
                mbgrey[0].style.position = `absolute`;
                mbgrey[0].style.top = `${mbinner - window.innerHeight + 50}px`;
                ref[0].style.position = 'absolute';
                ref[0].style.top = `${mbinner - window.innerHeight}px`;
              }, 300);
            }
            if (agent.match(/Android/i)) {
              document.getElementsByClassName('HeaderWrapper')[0].style.top = '-60px';
              const mbgrey = document.getElementsByClassName('mb-grey');
              const ref = document.getElementsByClassName('cm-title');
              const edit = document.getElementsByClassName('edit-header');
              const screen = document.getElementsByClassName('editor-wrapper');
              ref[0].style.top = '-150px';
              edit[0].style.top = '0';
              mbgrey[0].style.top = '51px';
              screen[0].style.marginTop = '100px';
              // alert('안드로이드입니다');
            }
            setFocus(idx);
          }}
          onBlur={() => {
            if (agent.match(/iPhone/i)) {
              const ref = document.getElementsByClassName('edit-header');
              const mbgrey = document.getElementsByClassName('mb-grey');
              ref[0].style.position = 'fixed';
              mbgrey[0].style.top = '181px';
              ref[0].style.top = '130px';
              mbgrey[0].style.position = `fixed`;
            }
            if (agent.match(/Android/i)) {
              const mbgrey = document.getElementsByClassName('mb-grey');
              document.getElementsByClassName('HeaderWrapper')[0].style.top = 0;
              const ref = document.getElementsByClassName('cm-title');
              const edit = document.getElementsByClassName('edit-header');
              const screen = document.getElementsByClassName('editor-wrapper');
              edit[0].style.top = '130px';
              ref[0].style.top = '58px';
              mbgrey[0].style.top = '181px';
              screen[0].style.marginTop = '230px';
              // alert('안드로이드입니다');
            }
          }}
          onInput={(e) => {
            dispatch({
              type: '@layouts/CHANGE_TITLE',
              payload: contentRef.current.innerHTML,
              idx
            });
          }}
          onSelect={(e) => {
            const select = window.getSelection();
            const style = window.getComputedStyle(select.focusNode.parentNode);
            const fontSize = parseInt(style.fontSize);
            const align = style.textAlign;
            const bold = document.queryCommandState('bold');
            const underline = document.queryCommandState('underline');
            const color = document.queryCommandValue('ForeColor');
            if (select.focusNode.localName === undefined && fontSize !== status.size) {
              dispatch({
                type: '@test/CHANGE_SIZE',
                payload: fontSize
              });
            }
            if (underline !== status.underline) {
              dispatch({
                type: '@test/CHANGE_UNDER',
                payload: underline
              });
            }
            if (bold !== status.bold) {
              dispatch({
                type: '@test/CHANGE_BOLD',
                payload: bold
              });
            }
            if (align !== status.align && align !== 'start') {
              dispatch({
                type: '@test/CHANGE_ALIGN',
                payload: align
              });
            }
            if (color !== status.color) {
              dispatch({
                type: '@test/CHANGE_COLOR',
                payload: color
              });
            }
          }}
        ></p>
      </div>
    </div>
  );
}

export default TemplateTitle;
