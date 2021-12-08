import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
const Btn = styled.div`
  position: fixed;
  width: 100%;
  height: 73px !important;
  border-top: solid 1px #dbdbdb;
  color: white;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 2000;
  padding: 0 15px;
  box-sizing: border-box;
  transition: bottom 0.2s ease-in-out;
  ${(props) => {
    return css`
      bottom: ${props.device ? '-74px' : 0};
    `;
  }}
  & > div {
    border-radius: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 51px !important;
    ${(props) => {
      return css`
        background-color: ${props.isTitle ? '#9b1ce1' : '#9a9a9a'};
      `;
    }}
  }
`;

function MbSave({ info: { title }, post, type }) {
  const dispatch = useDispatch();
  const isKeyboard = useSelector((state) => state.test.isKeyboard);
  useEffect(() => {
    function update(e) {
      setTimeout(() => {
        dispatch({
          type: '@test/KEYBOARD'
        });
      }, 100);
    }
    if (navigator.userAgent.match(/Android/i)) {
      window.addEventListener('resize', update);
    }
    return () => {
      window.removeEventListener('resize', update);
    };
  }, [dispatch]);
  return (
    <Btn
      device={isKeyboard}
      isTitle={title}
      onClick={() => {
        if (title) {
          post();
        }
      }}
    >
      <div>{type === 'new' ? '작성하기' : '수정하기'}</div>
    </Btn>
  );
}

export default MbSave;
