import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import "./styles/core.css";
import Main from "./Main/Main";
import Editor from "./Editor/Editor";
import Notice from "./Notice/Notice";
import Download from "./Download/Download";
import Header from "./Header/Header";
import Look from "./Look/Look";
import Question from "./Question/Question";
import Answer from "./Answer/Answer";
import Loading from "./Editor/components/Loading";
import Toast from "./common/Toast";
function Navigation() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/download" exact component={Download} />
        <Route path="/question" exact component={Question} />
        <Route path="/answer" exact component={Answer} />
        <Route path="/look" exact component={Look} />
        <Route path="/main" exact component={Main} />
        <Route path="/notice" exact component={Notice} />
        <Route path="/editor" exact component={Editor} />
      </Switch>
      <Toast />
      <Loading />
    </Router>
  );
}

export default Navigation;
