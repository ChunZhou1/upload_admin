import React from "react";
import { Link } from "react-router-dom";
const bootstrap = require("bootstrap");

import "../bootstrap/css/bootstrap.min.css";
import css from "./public_component.css";

const main_menu = [
  {
    id: 1,
    content: "Browse",
    content_link: "/product_table"
  }
  /*{
    id: 2,
    content: "Insert",
    content_link: "/Insert"
  },
  {
    id: 3,
    content: "Update",
    content_link: "/Update"
  },
  {
    id: 4,
    content: "Delete",
    content_link: "/"
  },

  {
    id: 5,
    content: "DeleteAll",
    content_link: "/"
  }*/
];

////////This is header component/////////////////////////////////////////////////////////////

export function Header(props) {
  return (
    <div className="container-fluid px-0">
      <div style={{ backgroundColor: "#ef8709", height: "20px" }}></div>
      <div className="d-flex justify-content-between">
        <div
          style={{ marginLeft: "9%", marginTop: "0.2%", marginBottom: "0%" }}
        >
          <Brand />
        </div>
        <div style={{ marginRight: "10%", marginTop: "1.5%" }}>
          <Home_nav_manage />
        </div>
      </div>
    </div>
  );
}

import brand from "../../images/brand.png";
function Brand() {
  return <img src={brand} style={{ width: "45%" }} />;
}

function Nav_item(props) {
  if (props.active == true) {
    return (
      <li className="nav-item">
        <Link
          to={props.href}
          className="nav-link"
          style={{ color: "#ef8709", fontSize: "15px", fontWeight: "600" }}
          onMouseEnter={props.nav_item_mouse_enter}
          onMouseLeave={props.nav_item_mouse_out}
        >
          {props.content}
        </Link>
      </li>
    );
  } else {
    return (
      <li className="nav-item">
        <Link
          to={props.href}
          className="nav-link"
          style={{ color: "#7491b6", fontSize: "15px", fontWeight: "600" }}
          onMouseEnter={props.nav_item_mouse_enter}
          onMouseLeave={props.nav_item_mouse_out}
        >
          {props.content}
        </Link>
      </li>
    );
  }
}

class Home_nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menu_list = main_menu.map((item, index) => {
      var if_active;

      if_active = index == this.props.active_number ? true : false;

      return (
        <Nav_item
          key={item.id.toString()}
          active={if_active}
          content={item.content}
          href={item.content_link}
          nav_item_mouse_enter={this.props.nav_item_mouse_enter.bind(
            this,
            index
          )}
          nav_item_mouse_out={this.props.nav_item_mouse_out.bind(this, index)}
        ></Nav_item>
      );
    });

    return <ul className="nav justify-content-end ">{menu_list}</ul>;
  }
}

class Home_nav_manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active_number: 1000
    };

    this.hand_mouse_enter = this.hand_mouse_enter.bind(this);
    this.hand_mouse_out = this.hand_mouse_out.bind(this);
  }

  hand_mouse_enter(number) {
    this.setState({ active_number: number });
  }

  hand_mouse_out(number) {
    this.setState({ active_number: 1000 });
  }

  render() {
    var active_number1 = this.state.active_number;

    return (
      <Home_nav
        active_number={active_number1}
        nav_item_mouse_enter={this.hand_mouse_enter}
        nav_item_mouse_out={this.hand_mouse_out}
      ></Home_nav>
    );
  }
}

/////////////////////the function below used to process foot/////////////////////////////////////////////////////////////////////////

function Foot_text() {
  return (
    <div>
      <div
        style={{ color: "#ef8709", fontWeight: "600" }}
        className="foot_font_width"
      >
        © SkynOcean Solutions Inc 2021
      </div>

      <div
        style={{ color: "#ef8709", fontWeight: "600" }}
        className="foot_font_width"
      >
        Address: Bay D, McNeil Mall, 251 Water Street, Summerside, PE, C1N 1B5
      </div>

      <div
        style={{ color: "#ef8709", fontWeight: "600" }}
        className="foot_font_width"
      >
        Email: info@skynocean.ca Phone: 902 436 2414
      </div>
    </div>
  );
}

export function Foot_container() {
  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <div style={{ textAlign: "center", paddingTop: "5%" }}>
        <Foot_text />
      </div>
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: "-2"
        }}
      >
        <Foot_image />
      </div>
    </div>
  );
}

import bottom from "../../images/bottom.svg";
function Foot_image() {
  return <img src={bottom} style={{ height: "70%", width: "100%" }} />;
}
