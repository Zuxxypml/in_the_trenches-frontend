import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import App from "./App";
import "./index.css";
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
