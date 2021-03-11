import async from "async";

import axios from "axios";

import React from "react";

const bootstrap = require("bootstrap");

import "../bootstrap/css/bootstrap.min.css";

import { req_product } from "../ajax";
import { upload_json } from "../ajax";
import { upload_picture } from "../ajax";

import history from "../history";
import { Redirect } from "react-router-dom";

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

async function get_data(obj, product, product_catalog, active_number) {
  obj.setState({
    product_id: product[active_number].id,
    catalog_list: product_catalog,
    select_catalog: product[active_number].catalog,
    product_content: product[active_number].content,
    file_name: product[active_number].pic_content
  });
}

async function upload_json_picture_product(
  id,
  product_content,
  product_catalog,
  file_name,
  action
) {
  var json1 = new Object();

  var json_url;

  switch (action) {
    case "insert":
      json_url = "upload/json/product";
      break;

    case "update":
      json_url = "upload/json/product_update";
      break;

    case "delete":
      json_url = "upload/json/product_delete";
      break;

    default:
      json_url = "";
      break;
  }

  json1.id = id;
  if (action != "delete") {
    json1.content = product_content;
    json1.catalog = product_catalog;
    json1.pic_content = file_name.name;
  } else {
    json1.content = "";
    json1.catalog = "";
    json1.pic_content = {};
  }

  var result1 = await upload_json(JSON.stringify(json1), json_url);

  if (action != "delete") {
    var result2 = await upload_picture(file_name, "upload/picture");
  } else {
    result2 = "picture upload success";
  }

  if (result1 != "json upload success" || result2 != "picture upload success") {
    return "upload fail";
  } else {
    return "upload success";
  }
}

//////////////////////////////////////////////////////////////////////

export class Product_insert_manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_content: "",
      select_catalog: "",
      file_name: "",
      product_id: 0,
      status: "waitting for upload",
      catalog_list: [],
      switch: false
    };

    this.handle_product_content_change = this.handle_product_content_change.bind(
      this
    );
    this.handle_product_catalog_change = this.handle_product_catalog_change.bind(
      this
    );

    this.handle_product_file_change = this.handle_product_file_change.bind(
      this
    );

    this.handle_upload = this.handle_upload.bind(this);

    this.handle_update = this.handle_update.bind(this);

    this.handle_delete = this.handle_delete.bind(this);

    this.fileInput = React.createRef();
  }

  handle_product_content_change(event) {
    this.setState({
      product_content: event.target.value,
      status: "waitting for upload"
    });
  }

  handle_product_catalog_change(event) {
    this.setState({
      select_catalog: event.target.value,
      status: "waitting for upload"
    });
  }

  handle_product_file_change() {
    this.setState({
      status: "waitting for upload"
    });
  }

  handle_upload() {
    upload_json_picture_product(
      9999,
      this.state.product_content,
      this.state.select_catalog,
      this.fileInput.current.files[0],
      "insert"
    )
      .then(result => {
        this.setState({ status: result });
      })
      .catch(e => {
        console.log("There has been a problem with upload: " + e.message);
      });
  }

  handle_update() {
    upload_json_picture_product(
      this.state.product_id,
      this.state.product_content,
      this.state.select_catalog,
      this.fileInput.current.files[0],
      "update"
    )
      .then(result => {
        console.log("update okokoK!!!!!!!!!!!!");
        this.setState({ status: result, switch: true });
      })
      .catch(e => {
        console.log("There has been a problem with upload: " + e.message);
      });
  }

  handle_delete() {
    upload_json_picture_product(
      this.state.product_id,
      this.state.product_content,
      this.state.select_catalog,
      this.fileInput.current.files[0],
      "delete"
    )
      .then(result => {
        console.log("update okokoK!!!!!!!!!!!!");
        this.setState({ status: result, switch: true });
      })
      .catch(e => {
        console.log("There has been a problem with upload: " + e.message);
      });
  }

  componentDidMount() {
    console.log("In product");

    console.log(history.location.state.active_number_product);

    var active_number = history.location.state.active_number_product;

    get_data(
      this,
      history.location.state.product,
      history.location.state.product_catalog,
      active_number
    ).catch(e => {
      console.log(
        "There has been a problem with your ajax request: " + e.message
      );
    });
  }

  render() {
    if (this.state.switch == true) {
      console.log("begin to switch");
      return <Redirect to="/product_table" />;
    }

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
              value={this.state.product_id}
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

        <div className="row" style={{ marginBottom: "5%" }}>
          <label for="pictute_name" className="form-label col-sm-2">
            Picture:
          </label>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="file"
              id="pictute_name"
              onChange={this.handle_product_file_change}
              ref={this.fileInput}
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-md-center">
          <div className="mb-3 col-sm-2 ">
            <input
              class="btn btn-primary"
              type="button"
              value="Insert"
              onClick={this.handle_upload}
            />
          </div>

          <div className="mb-3 col-sm-2 ">
            <input
              class="btn btn-info"
              type="button"
              value="Update"
              onClick={this.handle_update}
            />
          </div>
          <div className="mb-3 col-sm-2 ">
            <input
              class="btn btn-danger"
              type="button"
              value="Delete"
              onClick={this.handle_delete}
            />
          </div>
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////

//The funcion below used to process catalog ajax of catalog request

async function get_data_catalog(obj, product_catalog, active_number) {
  obj.setState({
    catalog_id: product_catalog[active_number].id,

    catalog_content: product_catalog[active_number].catalog_name,

    file_name: product_catalog[active_number].catalog_pic
  });
}

async function upload_json_picture_catalog(
  id,
  catalog_content,

  file_name,

  action
) {
  var json_url;
  var json1 = new Object();

  switch (action) {
    case "insert":
      json_url = "upload/json/catalog";
      break;

    case "update":
      json_url = "upload/json/catalog_update";
      break;

    case "delete":
      json_url = "upload/json/catalog_delete";
      break;

    default:
      json_url = "";
      break;
  }

  json1.id = id;
  if (action != "delete") {
    json1.catalog_name = catalog_content;

    json1.catalog_pic = file_name.name;
  } else {
    json1.catalog_name = "";

    json1.catalog_pic = {};
  }

  var result1 = await upload_json(JSON.stringify(json1), json_url);

  if (action != "delete") {
    var result2 = await upload_picture(file_name, "upload/picture");
  } else {
    result2 = "picture upload success";
  }

  if (result1 != "json upload success" || result2 != "picture upload success") {
    return "upload fail";
  } else {
    return "upload success";
  }
}

//////////////////////////////////////////////////////////////////////

export class Catalog_insert_manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog_content: "",

      file_name: "",
      catalog_id: 0,
      status: "waitting for upload",
      switch: false
    };

    this.handle_catalog_content_change = this.handle_catalog_content_change.bind(
      this
    );

    this.handle_catalog_file_change = this.handle_catalog_file_change.bind(
      this
    );

    this.handle_upload = this.handle_upload.bind(this);

    this.handle_update = this.handle_update.bind(this);

    this.handle_delete = this.handle_delete.bind(this);

    this.fileInput = React.createRef();
  }

  handle_catalog_content_change(event) {
    this.setState({
      catalog_content: event.target.value,
      status: "waitting for upload"
    });
  }

  handle_catalog_file_change() {
    this.setState({
      status: "waitting for upload"
    });
  }

  handle_upload() {
    upload_json_picture_catalog(
      8888,
      this.state.catalog_content,

      this.fileInput.current.files[0],
      "insert"
    )
      .then(result => {
        this.setState({ status: result });
      })
      .catch(e => {
        console.log("There has been a problem with upload: " + e.message);
      });
  }

  handle_update() {
    upload_json_picture_catalog(
      this.state.catalog_id,
      this.state.catalog_content,

      this.fileInput.current.files[0],
      "update"
    )
      .then(result => {
        this.setState({ status: result, switch: true });
      })
      .catch(e => {
        console.log("There has been a problem with upload: " + e.message);
      });
  }

  handle_delete() {
    upload_json_picture_catalog(
      this.state.catalog_id,
      this.state.catalog_content,

      this.fileInput.current.files[0],
      "delete"
    )
      .then(result => {
        this.setState({ status: result, switch: true });
      })
      .catch(e => {
        console.log("There has been a problem with upload: " + e.message);
      });
  }

  componentDidMount() {
    console.log("In catalog");

    console.log(history.location.state.active_number_catalog);

    var active_number = history.location.state.active_number_catalog;

    get_data_catalog(
      this,
      history.location.state.product_catalog,
      active_number
    ).catch(e => {
      console.log(
        "There has been a problem with your ajax request: " + e.message
      );
    });
  }

  render() {
    if (this.state.switch == true) {
      console.log("begin to switch");
      return <Redirect to="/catalog_table" />;
    }

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

        <div className="row" style={{ marginBottom: "5%" }}>
          <label for="pictute_name" className="form-label col-sm-2">
            Picture:
          </label>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="file"
              id="pictute_name"
              onChange={this.handle_catalog_file_change}
              ref={this.fileInput}
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-md-center">
          <div className="mb-3 col-sm-2 ">
            <input
              class="btn btn-primary"
              type="button"
              value="Insert"
              onClick={this.handle_upload}
            />
          </div>

          <div className="mb-3 col-sm-2 ">
            <input
              class="btn btn-info"
              type="button"
              value="Update"
              onClick={this.handle_update}
            />
          </div>
          <div className="mb-3 col-sm-2 ">
            <input
              class="btn btn-danger"
              type="button"
              value="Delete"
              onClick={this.handle_delete}
            />
          </div>
        </div>
      </div>
    );
  }
}
