import _ from "lodash";
import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Button } from "native-base";

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

  verUsuarios() {
    this.props.navigation.navigate("VerUsuarios");
  }

  verEmpleados() {
    this.props.navigation.navigate("VerEmpleados");
  }

  agregarServicio() {
    this.props.navigation.navigate("NuevoServicio");
  }

  verServicios() {
    this.props.navigation.navigate("VerServicios");
  }

  valorDolar() {
    this.props.navigation.navigate("ValorDolar");
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
        <ScrollView>
          <Button
            rounded
            style={styles.btnStyle}
            onPress={() => this.valorDolar()}
          >
            <Text style={styles.textStyle}>Cambio del Dia</Text>
          </Button>
          <Button
            rounded
            style={styles.btnStyle}
            onPress={() => {
              this.verReservaciones();
            }}
          >
            <Text style={styles.textStyle}>Ver Reservaciones</Text>
          </Button>
          <Button
            rounded
            style={styles.btnStyle}
            onPress={() => {
              this.verUsuarios();
            }}
          >
            <Text style={styles.textStyle}>Ver Usuarios</Text>
          </Button>
          <Button
            rounded
            style={styles.btnStyle}
            onPress={() => {
              this.verEmpleados();
            }}
          >
            <Text style={styles.textStyle}>Ver Empleados</Text>
          </Button>
          <Button
            rounded
            style={styles.btnStyle}
            onPress={() => this.agregarEmpleado()}
          >
            <Text style={styles.textStyle}>Nuevo Empleado</Text>
          </Button>
          <Button
            rounded
            style={styles.btnStyle}
            onPress={() => this.verServicios()}
          >
            <Text style={styles.textStyle}>Ver Servicios</Text>
          </Button>
          <Button
            rounded
            style={{
              backgroundColor: "#D5C046",
              height: 40,
              width: 200,
              marginTop: 30,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 30
            }}
            onPress={() => this.agregarServicio()}
          >
            <Text style={styles.textStyle}>Nuevo Servicio</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#D5C046",
    height: 40,
    width: 200,
    marginTop: 30,
    justifyContent: "center",
    alignSelf: "center"
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  }
});
