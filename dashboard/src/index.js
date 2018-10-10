import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { EnhancedAppContainerWithRouter as App } from "./EnhancedAppConatinerWithRouter";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { store, history } from "./state/";
import { ConnectedRouter as Router } from "react-router-redux";
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
