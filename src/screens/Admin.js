import _ from "lodash";
import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Button } from "native-base";

export default class Admin extends Component {
  //Configuracion para el Encabezado de la vista
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

  //Funciones para redireccionar a las vistas correspondientes
  verReservaciones() {
    this.props.navigation.navigate("VerReservaciones");
  }

  verUsuarios() {
    this.props.navigation.navigate("VerUsuarios");
  }

  verEmpleados() {
    this.props.navigation.navigate("VerEmpleados");
  }

  verServicios() {
    this.props.navigation.navigate("VerServicios");
  }

  valorDolar() {
    this.props.navigation.navigate("ValorDolar");
  }

  render() {
    // Destruturacion de sytles.
    const { btnStyle, textStyle } = styles;

    //Estructura de la vista
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#282828",
          justifyContent: "center"
        }}
      >
        <ScrollView>
          <Button rounded style={btnStyle} onPress={() => this.valorDolar()}>
            <Text style={textStyle}>Cambio del Dia</Text>
          </Button>
          <Button
            rounded
            style={btnStyle}
            onPress={() => {
              this.verReservaciones();
            }}
          >
            <Text style={textStyle}>Reservaciones</Text>
          </Button>
          <Button
            rounded
            style={btnStyle}
            onPress={() => {
              this.verUsuarios();
            }}
          >
            <Text style={textStyle}>Usuarios</Text>
          </Button>
          <Button
            rounded
            style={btnStyle}
            onPress={() => {
              this.verEmpleados();
            }}
          >
            <Text style={textStyle}>Empleados</Text>
          </Button>

          <Button rounded style={btnStyle} onPress={() => this.verServicios()}>
            <Text style={textStyle}>Servicios</Text>
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
