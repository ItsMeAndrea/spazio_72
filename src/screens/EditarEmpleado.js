import _ from "lodash";
import app from "../firebase/firebaseConfig";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import Share from "react-native-share";

class EditarEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empleados: []
    };
  }
  svg;

  componentDidMount() {
    app
      .database()
      .ref(`empleados/`)
      .on("value", snapshot => {
        const empleados = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ empleados: empleados });
      });
  }

  onButtonPress() {
    const test = this.state.empleados[3];
    const { nombre, apellido, qrData } = test;
    const shareImageBase64 = {
      title: "QR",
      message: `Codigo QR para ${nombre} ${apellido}`,
      url: `data:image/png;base64,${qrData}`
    };
    Share.open(shareImageBase64).catch(() => {
      console.log("no se compartio");
    });
  }
  render() {
    return (
      <View>
        <Button onPress={() => this.onButtonPress()}>
          <Text>Descargar QR</Text>
        </Button>
      </View>
    );
  }
}

export default EditarEmpleado;
