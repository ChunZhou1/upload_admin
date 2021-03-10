import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Router } from "react-router-dom";

import history from "./history";

import { Home } from "./home";
import { Insert } from "./insert";

import { Public_header } from "./public";

function Main() {
  return (
    <Switch>
      <Route path="/Insert">
        <Insert />
      </Route>
      <Route path="/">
        <Home />
      </Route>
            
    </Switch>
  );
}

function App() {
  return (
    <Router history={history}>
      <Public_header />
      <Main />
    </Router>
  );
}

export default App;
