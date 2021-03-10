import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Link } from "react-router-dom";

const bootstrap = require("bootstrap");

import "../bootstrap/css/bootstrap.min.css";

import css from "./home_component.css";

import { req_product } from "../ajax";

import history from "../history";

function Table_select_nav() {
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
          to="/catalog_table"
          className="nav-link"
          style={{ fontSize: "15px", fontWeight: "600" }}
        >
          Catalog Table
        </Link>
      </li>
    </div>
  );
}

function Table_select() {
  return (
    <Switch>
      <Route path="/catalog_table">
        <Table_catalog_manage />
      </Route>
      <Route path="/">
        <Table_product_manage />
      </Route>
            
    </Switch>
  );
}

export function Table_container() {
  return (
    <BrowserRouter>
      <Table_select_nav />
      <Table_select />
    </BrowserRouter>
  );
}

function Table_product_container(props) {
  return (
    <div className="container">
      <table class="table table-Primary">
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "center" }}>
              Id
            </th>

            <th scope="col" style={{ textAlign: "center" }}>
              Product Content
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Picture File
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Product Catalog
            </th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}

function Table_catalog_container(props) {
  return (
    <div className="container">
      <table class="table table-Primary">
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "center" }}>
              Id
            </th>

            <th scope="col" style={{ textAlign: "center" }}>
              Catalog Name
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Picture File
            </th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}

function Table_td(props) {
  return <td style={{ textAlign: "center" }}>{props.content}</td>;
}

function Table_td_img(props) {
  return (
    <td style={{ width: "25%", textAlign: "center" }}>
      <img
        className={props.img_class}
        src={props.src}
        style={{ width: "10%" }}
        onMouseEnter={props.handle_mouse_enter}
        onMouseLeave={props.handle_mouse_out}
      />
    </td>
  );
}

function Table_row(props) {
  return (
    <tr className={props.class} onClick={props.handle_click}>
      {props.children}
    </tr>
  );
}

class Table_product_manage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouse_active_num: 1000,
      active_number: 1000,
      product: [],
      product_catalog: []
    };

    this.handle_click = this.handle_click.bind(this);
    this.handle_mouse_enter = this.handle_mouse_enter.bind(this);
    this.handle_mouse_out = this.handle_mouse_out.bind(this);
  }

  componentDidMount() {
    req_product(this).catch(e => {
      console.log(
        "There has been a problem with your ajax request: " + e.message
      );
    });
  }

  handle_click(number) {
    this.setState({ active_number: number });

    /*this.props.history.push({
      pathname: "/Insert",
      state: { active_number: 1234 }
    });*/

    history.push({
      pathname: "/Insert",
      state: { active_number: 1234 }
    });
  }

  handle_mouse_enter(number) {
    this.setState({ mouse_active_num: number });
  }

  handle_mouse_out(number) {
    this.setState({ mouse_active_num: 1000 });
  }

  render() {
    var product = this.state.product;
    var active_number1 = this.state.active_number;
    var mouse_active_num1 = this.state.mouse_active_num;

    var product_list_row = product.map((item, index) => {
      var tr_class = active_number1 == index ? "table-active" : "";

      var img_class1 = mouse_active_num1 == index ? "ani" : "product_img";

      return (
        <Table_row
          key={index}
          class={tr_class}
          handle_click={this.handle_click.bind(this, index)}
        >
          <Table_td key={index + 4000} content={item.id} />
          <Table_td key={index + 4001} content={item.content} />
          <Table_td_img
            key={index + 4002}
            src={item.pic_content}
            handle_mouse_enter={this.handle_mouse_enter.bind(this, index)}
            handle_mouse_out={this.handle_mouse_out.bind(this, index)}
            img_class={img_class1}
          />
          <Table_td key={index + 4003} content={item.catalog} />
        </Table_row>
      );
    });

    return (
      <Table_product_container>{product_list_row}</Table_product_container>
    );
  }
}

class Table_catalog_manage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouse_active_num: 1000,
      active_number: 1000,
      product: [],
      product_catalog: []
    };

    this.handle_click = this.handle_click.bind(this);
    this.handle_mouse_enter = this.handle_mouse_enter.bind(this);
    this.handle_mouse_out = this.handle_mouse_out.bind(this);
  }

  componentDidMount() {
    req_product(this).catch(e => {
      console.log(
        "There has been a problem with your ajax request: " + e.message
      );
    });
  }

  handle_click(number) {
    this.setState({ active_number: number });
  }

  handle_mouse_enter(number) {
    this.setState({ mouse_active_num: number });
  }

  handle_mouse_out(number) {
    this.setState({ mouse_active_num: 1000 });
  }

  render() {
    var product_catalog = this.state.product_catalog;
    var active_number1 = this.state.active_number;
    var mouse_active_num1 = this.state.mouse_active_num;

    var calalog_list_row = product_catalog.map((item, index) => {
      var tr_class = active_number1 == index ? "table-active" : "";

      var img_class1 = mouse_active_num1 == index ? "ani" : "product_img";

      return (
        <Table_row
          key={index}
          class={tr_class}
          handle_click={this.handle_click.bind(this, index)}
        >
          <Table_td key={index + 4000} content={item.id} />
          <Table_td key={index + 4001} content={item.catalog_name} />
          <Table_td_img
            key={index + 4002}
            src={item.catalog_pic}
            handle_mouse_enter={this.handle_mouse_enter.bind(this, index)}
            handle_mouse_out={this.handle_mouse_out.bind(this, index)}
            img_class={img_class1}
          />
        </Table_row>
      );
    });

    return (
      <Table_catalog_container>{calalog_list_row}</Table_catalog_container>
    );
  }
}
