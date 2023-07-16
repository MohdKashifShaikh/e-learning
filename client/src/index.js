import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap/js/dist/modal.js";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "./App.css";
import "./App2.css";
import App from "./App";
import Context from "./Context";
import axios from "axios";

axios.defaults.withCredentials = true; //for multer, file uploading.

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
