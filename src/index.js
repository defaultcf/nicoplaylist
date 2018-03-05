import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from './app';

const app = () => {
  const body = document.querySelector("body");
  const app_area = document.createElement("nicoplaylist");
  body.appendChild(app_area);

  ReactDOM.render(
    <App />,
    app_area
  );
};

window.addEventListener("load", app);
