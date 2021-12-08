import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const color = [
  "#ff5c5c",
  "#ffb100",
  "#ffeb00",
  "#00db6e",
  "#16cbc4",
  "#3597ec",
  "#7435ec",
  "#ff65be",
  "#000000",
  "#adadad",
  "#ffffff",
];
function Ftstyle({ mbnow, agent }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const nowState = useSelector((state) => state.test.editor);
  const __bold = useCallback(() => {
    document.execCommand("bold");
  }, []);
  const __line = useCallback(() => {
    document.execCommand("underline");
  }, []);
  const __color = useCallback(() => {
    if (agent !== "mobile") {
      setIsOpen(!isOpen);
    } else {
      if (mbnow === "color") {
        dispatch({
          type: "@test/MOBILE",
          payload: "",
        });
      } else {
        dispatch({
          type: "@test/MOBILE",
          payload: "color",
        });
      }
    }
  }, [isOpen, agent, mbnow, dispatch]);
  const __changeColor = useCallback(
    (color) => {
      document.execCommand("foreColor", false, color);
      if (agent !== "mobile") {
        setIsOpen(false);
      } else {
        dispatch({
          type: "@test/MOBILE",
          payload: "",
        });
      }
    },
    [agent, dispatch]
  );

  const dummy = [
    { img: "bold", type: "BOLD", callback: __bold },
    { img: "line", type: "LINE", callback: __line },
    { img: "color", type: "COLOR", callback: __color },
  ];
  return (
    <div className="ftstyle-wrapper">
      {dummy.map(({ img, type, callback }, idx) => {
        return (
          <React.Fragment key={idx}>
            <button
              className="style-btn"
              onClick={callback}
              style={{
                backgroundColor:
                  (type === "BOLD" && nowState.bold) ||
                  (type === "LINE" && nowState.underline)
                    ? "#3597ec"
                    : undefined,
              }}
            >
              <img src={`/assets/editor/${img}.svg`} alt="이미지" />
              {type === "COLOR" ? (
                <div
                  style={{
                    backgroundColor: nowState.color ? nowState.color : "black",
                  }}
                  className="color-box"
                />
              ) : undefined}
            </button>
            {type === "COLOR" ? (
              <div className="mb-color-wrapper">
                <div
                  className="color-wrapper"
                  style={{ opacity: isOpen || mbnow === "color" ? 1 : 0 }}
                >
                  {isOpen || mbnow === "color"
                    ? color.map((item, idx) => {
                        return (
                          <button
                            onClick={() => {
                              __changeColor(item);
                            }}
                            className="color-box"
                            key={idx}
                            style={{
                              backgroundColor: item,
                              border:
                                item === "#ffffff" ? "solid 1px #dbdbdb" : 0,
                            }}
                          />
                        );
                      })
                    : undefined}
                </div>
              </div>
            ) : undefined}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Ftstyle;
