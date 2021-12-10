import React, { useCallback, useState } from "react";
import firebaseApp from "../../config/firebaseApp";
import { formatDate } from "../../lib/factory";

const Fstorage = firebaseApp.storage();
function Card({
  title,
  timestamp,
  navigation,
  id,
  template,
  __delete,
  category,
}) {
  const [isDelete, setIsDelete] = useState(false);
  const deleteFile = useCallback(async () => {
    if (template) {
      const filt = template.filter(
        (item) =>
          item.type === "IMAGE" ||
          item.type === "VIDEO" ||
          item.type === "SUMMARY"
      );
      await filt.forEach(({ content, type }) => {
        if (type === "IMAGE") {
          const { resize, url } = content;
          Fstorage.refFromURL(resize).delete();
          Fstorage.refFromURL(url).delete();
        }
        if (type === "VIDEO") {
          Fstorage.refFromURL(content).delete();
        }
        if (type === "SUMMARY") {
          const { images } = content;
          images.forEach(({ resize, img }) => {
            console.log(img);
            console.log(resize);
            Fstorage.refFromURL(resize).delete();
            Fstorage.refFromURL(img).delete();
          });
        }
      });
    }
    setIsDelete(false);
    __delete(id);
  }, [template, id, __delete]);
  return (
    <div className="card">
      <div className="left">
        <div className="category">{category}</div>
        <div className="title">{title}</div>
      </div>
      <div className="right">
        <div className="time">{formatDate(timestamp, ".")}</div>
        <div className="btn-wrapper">
          <div
            className="fix"
            onClick={() => {
              navigation("original", timestamp, id);
            }}
          >
            수정하기
          </div>
          <div
            className="remove"
            onClick={() => {
              setIsDelete(true);
            }}
          >
            삭제하기
          </div>
        </div>
      </div>
      <div className="delete-wrapper" style={{ right: isDelete ? 0 : -500 }}>
        <img
          src="/assets/editor/white-cancel.svg"
          alt="취소"
          className="white-cancel"
          onClick={() => {
            setIsDelete(false);
          }}
        />
        <div className="delete-title">해당 게시글을 삭제하시겠습니까?</div>
        <div className="delete-btn" onClick={deleteFile}>
          삭제
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card);
