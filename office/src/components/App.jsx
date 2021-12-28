import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import "./styles/core.css";
import Editor from "./Editor/Editor";
import Notice from "./Notice/Notice";
import Download from "./Download/Download";
import Header from "./Header/Header";
import Look from "./Look/Look";
import Question from "./Question/Question";
import Answer from "./Answer/Answer";
import Loading from "./Editor/components/Loading";
import Toast from "./common/Toast";
import PopupManager from "./PopupManager/PopupManager";
import Blog from "./Blog/Blog";
import Preview from "./Look/components/Preview";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import firebaseApp from "./config/firebaseApp";
const Fauth = firebaseApp.auth();
function Navigation() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.config.isLogin);
  useEffect(() => {
    const checkLogin = window.sessionStorage.getItem("isLogin");
    if (checkLogin === "true") {
      dispatch({
        type: "@config/isLogin",
        payload: true,
      });
    }
    return () => {};
  }, [dispatch]);
  useEffect(() => {
    Fauth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "@config/isLogin",
          payload: true,
        });
      } else {
        dispatch({
          type: "@config/isLogin",
          payload: false,
        });
      }
    });
    return () => {};
  }, [dispatch]);
  return (
    <Router>
      <Header isLogin={isLogin} />
      <Switch>
        {!isLogin ? (
          <Route path="/" exact component={Login} />
        ) : (
          <>
            <Route path="/" exact component={Download} />
            <Route path="/question" exact component={Question} />
            <Route path="/answer" exact component={Answer} />
            <Route path="/look" exact component={Look} />
            <Route path="/preview" exact component={Preview} />
            <Route path="/popup" exact component={PopupManager} />
            <Route path="/notice" exact component={Notice} />
            <Route path="/blog" exact component={Blog} />
            <Route path="/editor" exact component={Editor} />
          </>
        )}
      </Switch>
      <Toast />
      <Loading />
    </Router>
  );
}

export default Navigation;
