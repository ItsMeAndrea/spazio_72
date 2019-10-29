import React, { Component } from "react";
import { View, CheckBox, TouchableOpacity, Text } from "react-native";

class SeleccionarServicios extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      check: false
    };
  }
  static navigationOptions = {
    title: "Seleccionar Servicios",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white",
      flex: 1
    }
  };

  checkValue(value) {
    this.setState({ check: value });
  }
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "row", backgroundColor: "#282828" }}
      >
        <CheckBox
          value={this.state.check}
          onValueChange={() => this.checkValue(!this.state.check)}
        ></CheckBox>
        <Text>Choose Me</Text>
      </View>
    );
  }
}

export default SeleccionarServicios;
