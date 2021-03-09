import "regenerator-runtime/runtime";

import axios from "axios";

import async from "async";

import React from "react";

//the funtiomn below used to ajax req

async function getPictures_product(input_obj) {
  let reqList = [];

  let resList = [];

  for (var i = 0; i < input_obj.data.length; i++) {
    let req_url = "/get/picture/" + input_obj.data[i].pic_content + ".png";

    let req = axios.get(req_url, { responseType: "blob" });

    reqList.push(req);
    resList.push();
  }

  return axios.all(reqList).then(
    axios.spread(function(...resList) {
      return resList;
    })
  );
}

async function getPictures_catalog(input_obj) {
  let reqList = [];
  let resList = [];

  for (var i = 0; i < input_obj.data.length; i++) {
    let req_url = "/get/picture/" + input_obj.data[i].catalog_pic + ".png";

    let req = axios.get(req_url, { responseType: "blob" });

    reqList.push(req);
    resList.push();
  }

  return axios.all(reqList).then(
    axios.spread(function(...resList) {
      return resList;
    })
  );
}

function process_product(product, input_picture) {
  var blob, objectURL, product_t;

  product_t = product.data;

  for (var i = 0; i < product_t.length; i++) {
    blob = new Blob([input_picture[i].data]);
    objectURL = URL.createObjectURL(blob);

    product_t[i].pic_content = objectURL;
  }

  return product_t;
}

function process_product_catalog(product_catalog, input_picture) {
  var blob, objectURL, product_catalog_t;

  product_catalog_t = product_catalog.data;

  for (var i = 0; i < product_catalog_t.length; i++) {
    blob = new Blob([input_picture[i].data]);
    objectURL = URL.createObjectURL(blob);

    product_catalog_t[i].catalog_pic = objectURL;
  }

  return product_catalog_t;
}

export async function req_product(obj) {
  var result_p,
    result_product,
    result_catalog,
    result_product_e,
    result_catalog_e;
  result_product = await axios.get("/get/json/product");

  result_catalog = await axios.get("/get/json/product_catalog");

  result_p = await getPictures_product(result_product);

  result_product_e = process_product(result_product, result_p);

  result_p = await getPictures_catalog(result_catalog);

  result_catalog_e = process_product_catalog(result_catalog, result_p);

  obj.setState({
    product: result_product_e,
    product_catalog: result_catalog_e
  });
}

//the function below used to upload json and picture

export async function upload_json(input_json, url) {
  var res = await axios.post(url, input_json, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return res.data;
}

export async function upload_picture(file_name, url) {
  const formData = new FormData();

  formData.append("file", file_name);

  var res = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
}
