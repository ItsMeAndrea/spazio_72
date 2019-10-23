import _ from "lodash";
import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Button } from "native-base";
import ListItem from "../components/ListItem";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {};
  }
  static navigationOptions = {
    title: "Administrador",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white",
      textAlign: "center",
      flex: 1
    },
    headerLeft: (
      <Button
        style={{ marginLeft: 10, marginTop: 5 }}
        transparent
        onPress={() => app.auth().signOut()}
      >
        <Image source={require("../images/logout.png")} />
      </Button>
    )
  };

  agregarEmpleado() {
    this.props.navigation.navigate("NuevoEmpleado");
  }

  verReservaciones() {
    this.props.navigation.navigate("VerReservaciones");
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#282828",
          justifyContent: "center"
        }}
      >
        <Button
          rounded
          style={styles.btnStyle}
          onPress={() => {
            this.verReservaciones();
          }}
        >
          <Text style={styles.textStyle}>Ver Reservaciones</Text>
        </Button>
        <Button rounded style={styles.btnStyle}>
          <Text style={styles.textStyle}>Ver Usuarios</Text>
        </Button>
        <Button rounded style={styles.btnStyle}>
          <Text style={styles.textStyle}>Ver Empleados</Text>
        </Button>
        <Button
          rounded
          style={styles.btnStyle}
          onPress={() => this.agregarEmpleado()}
        >
          <Text style={styles.textStyle}>Nuevo Empleado</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#D5C046",
    height: 40,
    width: 200,
    marginBottom: 30,
    justifyContent: "center",
    alignSelf: "center"
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  }
});
