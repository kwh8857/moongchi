import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import firebaseApp from "../../config/firebaseApp";
const Fstorage = firebaseApp.storage();
const Fstore = firebaseApp.firestore();
function UploadFile({ __close, template, temKey, category, state }) {
  const dispatch = useDispatch();
  const [File, setFile] = useState(undefined);
  const __uploadFile = useCallback(
    (item, id) => {
      return new Promise((resolve, reject) => {
        Fstorage.ref(`/${category}/${temKey}/${item.name}`)
          .put(item)
          .then((res) => {
            res.ref.getDownloadURL().then((url) => {
              resolve({
                type: "FILE",
                content: {
                  title: item.name,
                  url,
                },
                id,
              });
            });
          });
      });
    },
    [temKey, category]
  );
  const __readFile = useCallback(() => {
    const arr = template.slice();
    let fileList = Object.values(File);
    Promise.all(
      fileList.map(async (item, idx) => {
        const result = await __uploadFile(
          item,
          `file-${
            new Date().getTime() - Math.floor(Math.random() * (100 - 1 + 1)) + 1
          }`
        ).then((result) => {
          return result;
        });
        return result;
      })
    ).then((result) => {
      if (state === "new") {
        Fstore.collection(category)
          .doc(temKey)
          .update({ template: [...arr, ...result] });
      } else {
        Fstore.collection(category)
          .doc(temKey)
          .get()
          .then((res) => {
            const value = res.data();
            if (value.urlList) {
              const concatArr = value.urlList.concat(result);
              res.ref.update({ urlList: concatArr });
              dispatch({
                type: "@layouts/INIT_DELETELIST",
                payload: concatArr,
              });
            } else {
              res.ref.update({ urlList: result });
              dispatch({
                type: "@layouts/INIT_DELETELIST",
                payload: result,
              });
            }
          });
      }
      dispatch({
        type: "@layouts/CHANGE_EDITOR",
        payload: [...arr, ...result],
      });
      __close();
    });
  }, [
    File,
    dispatch,
    __close,
    template,
    __uploadFile,
    state,
    category,
    temKey,
  ]);
  return (
    <div className="popup-wrapper file">
      <img
        src="/assets/editor/cancel.svg"
        alt=""
        className="cancel"
        onClick={__close}
      />
      <div className="popup-title">파일 업로드</div>
      <div
        className="content-wrapper file-content"
        onDrop={(e) => {
          setFile(e.dataTransfer.files);
          // __readFile(e.dataTransfer.files);
          e.stopPropagation();
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <label
          className="file-insert"
          style={File ? { backgroundColor: "rgb(234,244,252)" } : undefined}
        >
          <img
            src={`/assets/editor/${File ? "blue-" : ""}document.svg`}
            alt="insert"
          />
          <div
            className="insert-title"
            style={File ? { color: "#3597ec" } : undefined}
          >
            {File
              ? File.length > 1
                ? `${File[0].name} 외 ${File.length - 1}개`
                : `${File[0].name}`
              : "파일을 선택 또는 드래그해주세요"}
          </div>
          <input
            type="file"
            multiple={true}
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files);
              // __readFile(e.target.files);
            }}
          />
        </label>
      </div>
      <div
        className="link-btn file-btn"
        style={File ? undefined : { backgroundColor: "grey" }}
        onClick={() => {
          if (File) {
            __readFile();
          }
        }}
      >
        등록하기
      </div>
    </div>
  );
}

export default UploadFile;
