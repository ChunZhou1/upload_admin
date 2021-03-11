import React from "react";

const bootstrap = require("bootstrap");

import "../bootstrap/css/bootstrap.min.css";

import { Redirect } from "react-router-dom";

export class Login_in extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "", switch: false };

    this.handle_login_click = this.handle_login_click.bind(this);

    this.handle_user_change = this.handle_user_change.bind(this);

    this.handle_pwd_change = this.handle_pwd_change.bind(this);
  }

  handle_user_change(event) {
    this.setState({ username: event.target.value });
  }

  handle_pwd_change(event) {
    this.setState({ password: event.target.value });
  }

  handle_login_click() {
    var user = this.state.username;
    var pwd = this.state.password;

    if (user == "skynocean" && pwd == "sky1234") {
      this.setState({ switch: true });
    }
  }

  render() {
    if (this.state.switch == true) {
      return <Redirect to="/product_table" />;
    }

    return (
      <div className="container">
        <div
          style={{ marginTop: "10%", marginLeft: "40%", marginBottom: "5%" }}
        >
          <h2>Please Login</h2>
        </div>

        <div className="mb-3 row justify-content-md-center">
          <label for="staticuser" class="col-sm-2 col-form-label">
            User Name:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="staticuser"
              value={this.state.username}
              onChange={this.handle_user_change}
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-md-center">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            Password:
          </label>
          <div className="col-sm-3">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={this.state.password}
              onChange={this.handle_pwd_change}
            />
          </div>
        </div>

        <div
          className="mb-3 col-sm-2 "
          style={{ marginLeft: "45%", marginTop: "5%" }}
        >
          <input
            class="btn btn-primary"
            type="button"
            value="Login"
            onClick={this.handle_login_click}
          />
        </div>
      </div>
    );
  }
}
