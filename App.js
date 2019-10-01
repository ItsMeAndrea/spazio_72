import React, { Component } from "react";
import Navigator from "./src/Navigation/Navigator";
import { YellowBox } from "react-native";

class App extends Component {
  construct() {
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }
  render() {
    return <Navigator />;
  }
}

export default App;
