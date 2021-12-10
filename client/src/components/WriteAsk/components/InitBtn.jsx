import React from "react";
import { useSelector } from "react-redux";
import firebaseApp from "../../config/firebaseApp";
const Fstore = firebaseApp.firestore();
const Fstorage = firebaseApp.storage();
function InitBtn() {
  const screen = useSelector((state) => state.database.editor);
  return <button>등록</button>;
}

export default InitBtn;
