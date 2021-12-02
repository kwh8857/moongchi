import React from "react";
import Main from "./Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import "./css/core.css";
import Footer from "./Footer/Footer";
import Look from "./Look/Look";
import Ask from "./Ask/Ask";
import Posdown from "./Posdown/Posdown";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/look" exact element={<Look />} />
        <Route path="/ask" exact element={<Ask />} />
        <Route path="/down" exact element={<Posdown />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
