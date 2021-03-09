import async from "async";

import axios from "axios";

import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const bootstrap = require("bootstrap");

import "../bootstrap/css/bootstrap.min.css";

import { req_product } from "../ajax";

function Table_select_nav_insert() {
  return (
    <div className="d-flex justify-content-center">
      <li className="nav-item" style={{ listStyle: "none" }}>
        <Link
          to="/"
          className="nav-link"
          style={{ fontSize: "15px", fontWeight: "600" }}
        >
          Product Table
        </Link>
      </li>

      <li className="nav-item" style={{ listStyle: "none" }}>
        <Link
          to="/insert_catalog"
          className="nav-link"
          style={{ fontSize: "15px", fontWeight: "600" }}
        >
          Catalog Table
        </Link>
      </li>
    </div>
  );
}

function Table_select_insert() {
  return (
    <Switch>
      <Route path="/insert_catalog">
        <Catalog_insert_manage />
      </Route>
      <Route path="/">
        <Product_insert_manage />
      </Route>
            
    </Switch>
  );
}

export function Table_container_insert() {
  return (
    <BrowserRouter>
      <Table_select_nav_insert />
      <Table_select_insert />
    </BrowserRouter>
  );
}

function Select_catalog(props) {
  return (
    <select className="form-select" aria-label="">
      {props.children}
    </select>
  );
}

////////////////////////////////////////////////////////////////

//The funcion below used to process ajax request

async function get_max_id(obj) {
  var result_catalog = await axios.get("/get/json/product");

  obj.setState({ product_id: result_catalog.data.length + 1 });
}

class Product_insert_manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_content: "",
      select_catalog: "",
      file_name: "",
      product_id: 0
    };
  }

  componentDidMount() {
    get_max_id(this).catch(e => {
      console.log(
        "There has been a problem with your ajax request: " + e.message
      );
    });
  }

  render() {
    var product_id = this.state.product_id;
    return (
      <div className="container">
        <div className="mb-3 row">
          <label for="product_id" className="col-sm-2 col-form-label">
            Id
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="product_id"
              value={product_id}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="product_content" className="col-sm-2 col-form-label">
            Product_content:
          </label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="product_content" />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="product_catalog" className="col-sm-2 col-form-label">
            Product Catalog:
          </label>
          <div className="col-sm-2">
            <Select_catalog />
          </div>
        </div>

        <div className="mb-3 row">
          <label for="pictute_name" className="form-label col-sm-2">
            Picture:
          </label>
          <div className="col-sm-3">
            <input className="form-control" type="file" id="pictute_name" />
          </div>
        </div>
        <div className="mb-3 col-sm-2 " style={{ marginLeft: "50%" }}>
          <input class="btn btn-primary" type="button" value="Insert" />
        </div>
      </div>
    );
  }
}

class Catalog_insert_manage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="mb-3 row">
          <label for="catalog_id" className="col-sm-2 col-form-label">
            Id
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="catalog_id"
              value="1"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="catalog_name" className="col-sm-2 col-form-label">
            Catalog Name:
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="catalog_name" />
          </div>
        </div>

        <div className="mb-3 row">
          <label for="pictute_name" className="form-label col-sm-2">
            Picture:
          </label>
          <div className="col-sm-3">
            <input className="form-control" type="file" id="pictute_name" />
          </div>
        </div>
        <div className="mb-3 col-sm-2 " style={{ marginLeft: "50%" }}>
          <input class="btn btn-primary" type="button" value="Insert" />
        </div>
      </div>
    );
  }
}
