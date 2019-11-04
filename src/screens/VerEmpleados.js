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
        const empleados = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });
        this.setState({ empleados: empleados });
        console.log(empleados);
      });
  }

  onEdit = item => {
    this.props.navigation.navigate("EditarEmpleado", { item });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        <FlatList
          data={this.state.empleados}
          renderItem={({ item }) => (
            <EmpleadosItem onEdit={this.onEdit} empleado={item} />
          )}
          keyExtractor={item => item.correo}
        />
      </View>
    );
  }
}

export default VerEmpleados;
