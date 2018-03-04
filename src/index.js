import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import videoController from './videoController';

videoController();

const body = document.querySelector("body");
const app_area = document.createElement("nicoplaylist");
body.appendChild(app_area);

ReactDOM.render(
  <h1>hello</h1>,
  app_area
);
