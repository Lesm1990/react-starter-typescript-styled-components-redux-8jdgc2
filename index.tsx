import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { AppState } from './types';
import Test from './Test';
import store from './store';
import "./style.css";

class App extends Component<{}, AppState> {

  render() {
    
    return (
      <Provider store={store}>
        <Test />
      </Provider>
    )
  }
}

render(<App />, document.getElementById("root"));
