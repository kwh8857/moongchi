import React, { useEffect, useState } from "react";
import Main from "./Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import "./css/core.css";
import Footer from "./Footer/Footer";
import Look from "./Look/Look";
import Ask from "./Ask/Ask";
import Posdown from "./Posdown/Posdown";
import WriteAsk from "./WriteAsk/WriteAsk";
import Notice from "./Notice/Notice";
import Blog from "./Blog/Blog";
import Detail from "./Detail/Detail";
import Popup from "./common/Popup";
import firebaseApp from "./config/firebaseApp";
import FirstPopup from "./FirstPopup/FirstPopup";
function App() {
  const [isFirst, setisFirst] = useState(undefined);
  useEffect(() => {
    firebaseApp
      .firestore()
      .collection("config")
      .doc("popup")
      .get()
      .then((res) => {
        if (!res.emty) {
          const value = res.data();
          const time = new Date(value.time);
          time.setHours(0);
          if (Date.now() <= time.getTime()) {
            setisFirst(res.data());
          }
        }
      });
    return () => {};
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/look" exact element={<Look />} />
        <Route path="/ask" exact element={<Ask />} />
        <Route path="/down" exact element={<Posdown />} />
        <Route path="/write" exact element={<WriteAsk />} />
        <Route path="/notice" exact element={<Notice />} />
        <Route path="/blog" exact element={<Blog />} />
        <Route path="/detail/:type/:id" exact element={<Detail />} />
      </Routes>
      {isFirst ? <FirstPopup data={isFirst} cancel={setisFirst} /> : undefined}
      <Popup />
      <Footer />
    </Router>
  );
}

export default App;
