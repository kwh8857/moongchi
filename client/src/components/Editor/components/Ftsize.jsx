import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const arr = [13, 15, 17, 19, 21, 23, 25];
function Ftsize({ agent, mbnow }) {
  const dispatch = useDispatch();
  const nowFt = useSelector((state) => state.test.editor.size);
  const [isOpen, setIsOpen] = useState(false);
  const __changeFt = useCallback(
    (index) => {
      document.execCommand('fontSize', false, index);
      if (agent !== 'mobile') {
        setIsOpen(false);
      } else {
        dispatch({
          type: '@test/MOBILE',
          payload: ''
        });
      }
    },
    [agent, dispatch]
  );
  const __changeOpen = useCallback(() => {
    if (agent !== 'mobile') {
      setIsOpen(!isOpen);
    } else {
      if (mbnow !== 'font') {
        dispatch({
          type: '@test/MOBILE',
          payload: 'font'
        });
      } else {
        dispatch({
          type: '@test/MOBILE',
          payload: ''
        });
      }
    }
  }, [isOpen, agent, mbnow, dispatch]);
  return (
    <div className="ftsize">
      <button className="now-ft" onClick={__changeOpen}>
        {nowFt}pt
        <img src="/assets/editor/drop.svg" alt="열기" />
      </button>
      {(agent !== 'mobile' && isOpen) || mbnow === 'font' ? (
        <div className="mb-wrapper">
          <div className="ft-list">
            {arr.map((item, idx) => {
              return (
                <button
                  key={idx}
                  className="ft-card"
                  style={item === nowFt ? { fontWeight: 'bold', color: '#3597ec' } : undefined}
                  onClick={() => {
                    __changeFt(idx + 1);
                  }}
                >
                  {item}pt
                  {nowFt === item ? <div className="sky-circle" /> : undefined}
                </button>
              );
            })}
          </div>
        </div>
      ) : undefined}
    </div>
  );
}

export default Ftsize;
