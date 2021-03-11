import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Router } from "react-router-dom";

import history from "./history";

import { Table_select_nav } from "./component/home_component";
import { Table_product_manage } from "./component/home_component";
import { Table_catalog_manage } from "./component/home_component";

import { Catalog_insert_manage } from "./component/insert_component";
import { Product_insert_manage } from "./component/insert_component";
import { Login_in } from "./component/login_component";

import { Public_header } from "./public";

function Main() {
  return (
    <Switch>
      <Route path="/insert_catalog">
        <Public_header />
        <Catalog_insert_manage />
      </Route>
      <Route path="/insert_product">
        <Public_header />
        <Product_insert_manage />
      </Route>
      <Route path="/catalog_table">
        <Public_header />
        <Table_select_nav />
        <Table_catalog_manage />
      </Route>
      <Route path="/product_table">
        <Public_header />
        <Table_select_nav />
        <Table_product_manage />
      </Route>
      <Route path="/">
        <Login_in />
      </Route>
            
    </Switch>
  );
}

function App() {
  return (
    <Router history={history}>
      <Main />
    </Router>
  );
}

export default App;
