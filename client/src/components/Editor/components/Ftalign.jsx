import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const dummy = [
  { img: 'left', type: 'justifyLeft' },
  { img: 'center', type: 'justifyCenter' },
  { img: 'right', type: 'justifyRight' }
];
function Ftalign({ agent, mbnow }) {
  const dispatch = useDispatch();
  const nowState = useSelector((state) => state.test.editor.align);

  const __changeAlign = useCallback(
    (type) => {
      let data;
      if (type === 'justifyCenter') {
        data = 'center';
      } else if (type === 'justifyRight') {
        data = 'right';
      } else {
        data = 'left';
      }
      dispatch({
        type: '@test/CHANGE_ALIGN',
        payload: data
      });
      document.execCommand(type);
    },
    [dispatch]
  );
  const __Change = useCallback(() => {
    if (mbnow !== 'align') {
      dispatch({
        type: '@test/MOBILE',
        payload: 'align'
      });
    } else {
      dispatch({
        type: '@test/MOBILE',
        payload: ''
      });
    }
  }, [dispatch, mbnow]);
  return (
    <div className="ftalign-wrapper">
      {agent !== 'mobile' ? (
        dummy.map(({ img, type }, idx) => {
          return (
            <button
              className="align-btn"
              key={idx}
              onClick={() => {
                __changeAlign(type);
              }}
            >
              <img
                src={`/assets/editor/${img}.svg`}
                alt={`${img}`}
                style={nowState !== img ? { filter: 'grayscale(100%)' } : undefined}
              />
            </button>
          );
        })
      ) : (
        <>
          <button className="align-btn" onClick={__Change}>
            <img src={`/assets/editor/${nowState}.svg`} alt={`${nowState}`} />
          </button>
          {mbnow === 'align' ? (
            <div className="mobile-align">
              {dummy.map(({ img, type }, idx) => {
                return (
                  <button
                    className="align-btn"
                    key={idx}
                    onClick={() => {
                      __changeAlign(type);
                      __Change();
                    }}
                  >
                    <img
                      src={`/assets/editor/${img}.svg`}
                      alt={`${img}`}
                      style={nowState !== img ? { filter: 'grayscale(100%)' } : undefined}
                    />
                  </button>
                );
              })}
            </div>
          ) : undefined}
        </>
      )}
    </div>
  );
}

export default Ftalign;
