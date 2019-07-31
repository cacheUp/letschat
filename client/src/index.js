import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
