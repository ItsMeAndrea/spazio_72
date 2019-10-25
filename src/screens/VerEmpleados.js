import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import _ from "lodash";
import { FlatList, View } from "react-native";

import EmpleadosItem from "../components/EmpleadosItem";

class VerEmpleados extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      empleados: []
    };
  }
  static navigationOptions = {
    title: "Empleados",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  componentWillMount() {
    app
      .database()
      .ref("empleados/")
      .on("value", snapshot => {
        const empleados = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ empleados: empleados });
      });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        <FlatList
          data={this.state.empleados}
          renderItem={({ item }) => (
            <EmpleadosItem nombre={item.nombre} apellido={item.apellido} />
          )}
          keyExtractor={item => item.nombre}
        />
      </View>
    );
  }
}

export default VerEmpleados;
