import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import _ from "lodash";
import { FlatList, View, ToastAndroid } from "react-native";
import { HeaderBackButton } from "react-navigation";

import EmpleadosItem from "../components/EmpleadosItem";

class VerEmpleados extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Empleados",
      headerStyle: {
        backgroundColor: "#282828"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("Home")} />
      )
    };
  };

  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      empleados: []
    };
  }

  componentWillMount() {
    app
      .database()
      .ref("empleados/")
      .on("value", snapshot => {
        const empleados = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });
        this.setState({ empleados: empleados });
      });
  }

  onEdit = item => {
    this.props.navigation.navigate("EditarEmpleado", { item });
  };
  render() {
    const actionAlert = this.props.navigation.getParam("actionAlert");

    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        {actionAlert !== undefined &&
          ToastAndroid.showWithGravity(
            `${actionAlert}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          )}
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
