import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Text, StyleSheet, Image } from "react-native";
import { Form, Input, Item, Button } from "native-base";

class NuevoEmpleado extends Component {
  static navigationOptions = {
    title: "Nuevo Empleado",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  state = {
    nombre: "",
    apellido: ""
  };

  onButtonPress() {
    const { nombre, apellido } = this.state;

    const empleadoRef = app
      .database()
      .ref(`empleados/`)
      .push({ nombre: `${nombre}`, apellido: `${apellido}` });

    const empleadoID = empleadoRef.key;

    this.props.navigation.navigate("CodigoEmpleado", {
      empleadoID,
      nombre,
      apellido
    });
  }
  render() {
    const {
      container,
      itemStyle,
      inputStyle,
      imageStyle,
      btnStyle,
      textStyle
    } = styles;
    return (
      <View style={container}>
        <Form>
          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require("../images/username.png")}
            />
            <Input
              style={inputStyle}
              placeholder="Nombre"
              placeholderTextColor="white"
              value={this.state.nombre}
              onChangeText={nombre => this.setState({ nombre })}
            />
          </Item>
          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require("../images/username.png")}
            />
            <Input
              style={inputStyle}
              placeholder="Apellido"
              placeholderTextColor="white"
              value={this.state.apellido}
              onChangeText={apellido => this.setState({ apellido })}
            />
          </Item>
        </Form>
        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => this.onButtonPress()}
        >
          <Text style={textStyle}>Generar Codigo QR</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
    justifyContent: "center"
  },
  itemStyle: {
    backgroundColor: "gray",
    opacity: 0.8,
    marginRight: 30,
    marginLeft: 30,
    height: 40,
    marginBottom: 10,
    color: "white"
  },
  inputStyle: {
    color: "white",
    fontSize: 12
  },
  imageStyle: {
    height: 20,
    width: 20,
    marginLeft: 10
  },
  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    alignSelf: "center",
    marginHorizontal: 30
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  }
});
export default NuevoEmpleado;
