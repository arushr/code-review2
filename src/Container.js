import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Reducer from "./reducers/user";
import App from "./App";

const store = createStore(Reducer);
class Container extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Container;
