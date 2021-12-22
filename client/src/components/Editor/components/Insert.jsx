import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Resizer from "react-image-file-resizer";
import { __UPDATE_LOADING__ } from "../../../common/actionTypes";

function Insert({ category, state, uid, urlList, agent }) {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.database.editor);
  const [dummy, setdummy] = useState([]);
  const __fileReader = useCallback((file) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        var img = new Image();
        img.src = imageUrl;
        img.onload = function (e) {
          Resizer.imageFileResizer(
            file,
            5,
            5,
            "JPEG",
            100,
            0,
            (uri) => {
              resolve({
                url: imageUrl,
                resize: uri,
                name: file.name,
                width: this.width,
                height: this.height,
              });
            },
            "base64"
          );
        };
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const __imageUpdate = useCallback(
    (e) => {
      dispatch({
        type: __UPDATE_LOADING__,
        payload: true,
      });
      let fileList = Object.values(e.target.files);
      const base64 = Promise.all(
        fileList.map((item) => {
          const da = __fileReader(item).then((result) => {
            return result;
          });
          return da;
        })
      );
      base64.then((result) => {
        Promise.all(
          result.map(({ url, name, resize, width, height }) => {
            return {
              type: "image",
              content: {
                url,
                resize,
              },
              width,
              height,
              id: `image-${
                new Date().getTime() -
                Math.floor(Math.random() * (100 - 1 + 1)) +
                1
              }`,
            };
          })
        ).then((result) => {
          const arr = template.slice();
          const res = [...arr, ...result];
          dispatch({
            type: "@layouts/CHANGE_EDITOR",
            payload: res,
          });
          dispatch({
            type: __UPDATE_LOADING__,
            payload: false,
          });
        });
      });
    },
    [__fileReader, template, dispatch]
  );
  useEffect(() => {
    if (agent !== "mobile") {
      setdummy([
        // { img: 'summary', type: 'SUMMARY' },
        { img: "temp", type: "image" },
        // { img: "horizontal", type: "horizontal" },
        // { img: 'video', type: 'VIDEO' },
        // { img: "youtube", type: "youtube" },
        // { img: "link", type: "link" },
        // { img: "file", type: "file" },
      ]);
    } else {
      setdummy([{ img: "temp", type: "image" }]);
    }
    return () => {};
  }, [agent]);
  return (
    <div className="insert-wrapper">
      {dummy.map(({ img, type }, idx) => {
        return (
          <label className="test-img" key={idx}>
            <input
              type="file"
              style={{ opacity: 0 }}
              multiple={true}
              accept="image/*"
              onChange={__imageUpdate}
            />

            <img
              src={`/assets/editor/${img}.svg`}
              alt={`${img}`}
              className="btn-img"
              style={{ position: "absolute" }}
            />
          </label>
        );
      })}
    </div>
  );
}

export default Insert;
