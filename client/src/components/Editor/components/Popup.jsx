import React, { useCallback } from "react";
import Link from "./Link";
import UploadFile from "./UploadFile";
import { useSelector } from "react-redux";
// import Video from './Video';
import Youtube from "./Youtube";

function Popup({
  isUp: { status, type },
  setIsUp,
  temKey,
  category,
  state,
  urlList,
  uid,
}) {
  const template = useSelector((state) => state.database.editor);
  const __close = useCallback(() => {
    setIsUp({
      status: false,
      type: "",
    });
  }, [setIsUp]);
  return status ? (
    <div className="popup-pack">
      <div className="back-black" />
      <div
        className="popup-main"
        // style={type === "VIDEO" ? { width: "663px" } : undefined}
      >
        {type === "link" ? (
          <Link __close={__close} template={template} />
        ) : type === "file" ? (
          <UploadFile
            __close={__close}
            template={template}
            temKey={temKey}
            category={category}
            state={state}
            urlList={urlList}
            uid={uid}
          />
        ) : (
          //  type === "VIDEO" ? (
          //   <Video __close={__close} template={template} temKey={temKey} />
          // ) :
          <Youtube __close={__close} template={template} />
        )}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Popup;
