import React from "react";
import "./App.css";
import { MainInputContainer as MainInput } from "./containers/MainInput";
import { Switch, Route } from "react-router-dom";
import { Login } from "./containers/Login";
import { ListContainer as List } from "./containers/List";
import { Create } from "./containers/Create";
export var App = () => (
  <Switch>
    <Route exact path="/" component={List} />
    <Route path="/auth" component={Login} />
    <Route path="/create" component={Create} />
    <Route path="/edit" component={MainInput} />
  </Switch>
);
