import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import QRCode from "react-native-qrcode-svg";
import Share from "react-native-share";

class CodigoEmpleado extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      qrData: ""
    };
  }

  svg;

  static navigationOptions = {
    title: "Generar Codigo QR",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white",
      textAlign: "center",
      flex: 1
    }
  };

  saveQRCode() {
    const nombre = this.props.navigation.getParam("nombre");
    const apellido = this.props.navigation.getParam("apellido");
    const empleadoID = this.props.navigation.getParam("empleadoID");
    this.svg.toDataURL(data => {
      const shareImageBase64 = {
        title: "QR",
        message: `Codigo QR para ${nombre} ${apellido}`,
        url: `data:image/png;base64,${data}`
      };
      Share.open(shareImageBase64).catch(() => {
        console.log("no se compartio");
      });
    });
    this.svg.toDataURL(data => {
      app
        .database()
        .ref(`empleados/${empleadoID}/`)
        .update({ qrData: `${data}` });
    });
  }

  /*  getDataURL() {
    const empleadoID = this.props.navigation.getParam("empleadoID");

    app
      .database()
      .ref(`empleados/${empleadoID}/`)
      .update({ qrData: this.state.qrData });
  } */

  render() {
    const { container, btnStyle, textStyle } = styles;
    const empleadoID = this.props.navigation.getParam("empleadoID");
    return (
      <View style={container}>
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "white",
            padding: 10,
            marginBottom: 20
          }}
        >
          <QRCode
            value={`spazio72://empleados/${empleadoID}`}
            size={250}
            logoBackgroundColor="transparent"
            getRef={c => (this.svg = c)}
            quietZone={10}
          />
        </View>

        <Button
          rounded
          block
          style={btnStyle}
          onPress={() => this.saveQRCode()}
        >
          <Text style={textStyle}>Compartir</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#282828"
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

export default CodigoEmpleado;
