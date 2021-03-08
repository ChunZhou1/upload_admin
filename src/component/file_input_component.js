import React from "react";

const bootstrap = require("bootstrap");

import axios from "axios";

import "../bootstrap/css/bootstrap.min.css";

export class File_input extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`Selected file - ${this.fileInput.current.value}`);
    //begin to upload
    console.log("begin to upload");
    const formData = new FormData();
    formData.append("file", this.fileInput.current.files[0]);
    formData.append("userName", "admin");
    formData.append("fileName", "cent_2");

    //for json : JSON.stringify(params),"Content-Type": "application/json"
    //for form "application/x-www-form-urlencoded;charset=UTF-8"

    axios
      .post("/upload/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        console.log("upload success");
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
