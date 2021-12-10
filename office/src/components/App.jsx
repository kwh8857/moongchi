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
function Navigation() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/download" exact component={Download} />
        <Route path="/look" exact component={Look} />
        <Route path="/main" exact component={Main} />
        <Route path="/notice" exact component={Notice} />
        <Route path="/editor" exact component={Editor} />
      </Switch>
    </Router>
  );
}

export default Navigation;
