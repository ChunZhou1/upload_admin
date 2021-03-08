import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Home } from "./home";

import { Public_header } from "./public";
import { Public_footer } from "./public";

function Main() {
  return (
    <Switch>
      <Route path="/Insert"></Route>
      <Route path="/Update"></Route>
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
      <Public_footer />
    </BrowserRouter>
  );
}

export default App;
