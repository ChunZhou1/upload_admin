import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Home } from "./home";
import { Insert } from "./insert";

import { Public_header } from "./public";
import { Public_footer } from "./public";

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
    <BrowserRouter>
      <Public_header />
      <Main />
    </BrowserRouter>
  );
}

export default App;
