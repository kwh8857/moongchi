import React from "react";
import Ftsize from "./Ftsize";
import Ftstyle from "./Ftstyle";
import Ftalign from "./Ftalign";
import Insert from "./Insert";
function EdiHeader({ setIsUp, temKey, category }) {
  return (
    <div className="edit-header">
      <Ftsize />
      <div className="line" />
      <Ftstyle />
      <div className="line" />
      <Ftalign />
      <div className="line" />
      <Insert setIsUp={setIsUp} temKey={temKey} category={category} />
    </div>
  );
}

export default EdiHeader;
