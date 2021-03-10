import async from "async";

import axios from "axios";

import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const bootstrap = require("bootstrap");

import "../bootstrap/css/bootstrap.min.css";

import { req_product } from "../ajax";
import { upload_json } from "../ajax";
import { upload_picture } from "../ajax";

import history from "../history";

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
    <select
      className="form-select"
      aria-label=""
      value={props.value}
      onChange={props.handle_product_catalog_change}
    >
      {props.children}
    </select>
  );
}

////////////////////////////////////////////////////////////////

//The funcion below used to process product ajax request

async function get_data(obj) {
  var result_product = await axios.get("/get/json/product");
  var result_catalog = await axios.get("/get/json/product_catalog");

  obj.setState({
    product_id: result_product.data.length + 1,
    catalog_list: result_catalog.data,
    select_catalog: result_catalog.data[0].catalog_name,
    product_content: ""
  });
}

async function upload_json_picture_product(
  id,
  product_content,
  product_catalog,
  file_name
) {
  var json1 = new Object();

  json1.id = id;
  json1.content = product_content;
  json1.catalog = product_catalog;
  json1.pic_content = file_name.name;

  console.log(file_name.name);

  var result1 = await upload_json(JSON.stringify(json1), "upload/json/product");

  var result2 = await upload_picture(file_name, "upload/picture");

  if (result1 != "json upload success" || result2 != "picture upload success") {
    return "upload fail";
  } else {
    return "upload success";
  }
}

//////////////////////////////////////////////////////////////////////

class Product_insert_manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_content: "",
      select_catalog: "",
      file_name: "",
      product_id: 0,
      status: "waitting for upload",
      catalog_list: []
    };

    this.handle_product_content_change = this.handle_product_content_change.bind(
      this
    );
    this.handle_product_catalog_change = this.handle_product_catalog_change.bind(
      this
    );

    this.handle_upload = this.handle_upload.bind(this);

    this.handle_return = this.handle_return.bind(this);

    this.fileInput = React.createRef();
  }

  handle_product_content_change(event) {
    this.setState({ product_content: event.target.value });
  }

  handle_product_catalog_change(event) {
    this.setState({ select_catalog: event.target.value });
  }

  handle_upload() {
    upload_json_picture_product(
      9999,
      this.state.product_content,
      this.state.select_catalog,
      this.fileInput.current.files[0]
    )
      .then(result => {
        get_data(this).catch(e => {
          console.log(
            "There has been a problem with your ajax request: " + e.message
          );
        });
        this.setState({ status: result });
      })
      .catch(e => {
        console.log("There has been a problem with upload: " + e.message);
      });
  }

  handle_return() {
    history.push({
      pathname: "/",
      state: { active_number: 5678 }
    });
  }

  componentDidMount() {
    console.log("In product");
    console.log(history.location.state.active_number);
    get_data(this).catch(e => {
      console.log(
        "There has been a problem with your ajax request: " + e.message
      );
    });
  }

  render() {
    var product_id = this.state.product_id;
    var catalog_list1 = this.state.catalog_list;

    var catalog_option = catalog_list1.map((item, index) => {
      return (
        <option key={index} value={item.catalog_name}>
          {item.catalog_name}
        </option>
      );
    });

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

          <div className="col-sm-2">{this.state.status}</div>
        </div>
        <div className="mb-3 row">
          <label for="product_content" className="col-sm-2 col-form-label">
            Product_content:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="product_content"
              value={this.state.product_content}
              onChange={this.handle_product_content_change}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="product_catalog" className="col-sm-2 col-form-label">
            Product Catalog:
          </label>
          <div className="col-sm-4">
            <Select_catalog
              value={this.state.select_catalog}
              handle_product_catalog_change={this.handle_product_catalog_change}
            >
              {catalog_option}
            </Select_catalog>
          </div>
        </div>

        <div className="mb-3 row">
          <label for="pictute_name" className="form-label col-sm-2">
            Picture:
          </label>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="file"
              id="pictute_name"
              ref={this.fileInput}
            />
          </div>
        </div>
        <div className="mb-3 col-sm-2 " style={{ marginLeft: "50%" }}>
          <input
            class="btn btn-primary"
            type="button"
            value="Insert"
            onClick={this.handle_upload}
            onDoubleClick={this.handle_return}
          />
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////

//The funcion below used to process catalog ajax of catalog request

async function get_data_catalog(obj) {
  var result_catalog = await axios.get("/get/json/product_catalog");

  obj.setState({
    catalog_id: result_catalog.data.length + 1,

    catalog_content: ""
  });
}

async function upload_json_picture_catalog(
  id,
  catalog_content,

  file_name
) {
  var json1 = new Object();

  json1.id = id;
  json1.catalog_name = catalog_content;

  json1.catalog_pic = file_name.name;

  var result1 = await upload_json(JSON.stringify(json1), "upload/json/catalog");

  var result2 = await upload_picture(file_name, "upload/picture");

  if (result1 != "json upload success" || result2 != "picture upload success") {
    return "upload fail";
  } else {
    return "upload success";
  }
}

//////////////////////////////////////////////////////////////////////

class Catalog_insert_manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog_content: "",

      file_name: "",
      catalog_id: 0,
      status: "waitting for upload"
    };

    this.handle_catalog_content_change = this.handle_catalog_content_change.bind(
      this
    );

    this.handle_upload = this.handle_upload.bind(this);

    this.fileInput = React.createRef();
  }

  handle_catalog_content_change(event) {
    this.setState({ catalog_content: event.target.value });
  }

  handle_upload() {
    upload_json_picture_catalog(
      8888,
      this.state.catalog_content,

      this.fileInput.current.files[0]
    )
      .then(result => {
        get_data_catalog(this).catch(e => {
          console.log(
            "There has been a problem with your ajax request: " + e.message
          );
        });
        this.setState({ status: result });
      })
      .catch(e => {
        console.log("There has been a problem with upload: " + e.message);
      });
  }

  componentDidMount() {
    console.log("In catalog");
    console.log(history.location.state.active_number);
    get_data_catalog(this).catch(e => {
      console.log(
        "There has been a problem with your ajax request: " + e.message
      );
    });
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
              value={this.state.catalog_id}
            />
          </div>

          <div className="col-sm-2">{this.state.status}</div>
        </div>
        <div className="mb-3 row">
          <label for="catalog_name" className="col-sm-2 col-form-label">
            Catalog Name:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="catalog_name"
              value={this.state.catalog_content}
              onChange={this.handle_catalog_content_change}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label for="pictute_name" className="form-label col-sm-2">
            Picture:
          </label>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="file"
              id="pictute_name"
              ref={this.fileInput}
            />
          </div>
        </div>
        <div className="mb-3 col-sm-2 " style={{ marginLeft: "50%" }}>
          <input
            class="btn btn-primary"
            type="button"
            value="Insert"
            onClick={this.handle_upload}
          />
        </div>
      </div>
    );
  }
}
