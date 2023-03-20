//import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./utilities/configureStore";
// eslint-disable-next-line
import socketChannel from "./Socket/channel";

import "typeface-roboto";
import "./index.scss";
import App from "./App";

const store = configureStore();

const container = document.getElementById("root")

const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
