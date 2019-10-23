import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import QRCode from "react-native-qrcode-svg";
import Share from "react-native-share";

class CodigoEmpleado extends Component {
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

  saveQrToDisk() {
    const nombre = this.props.navigation.getParam("nombre");
    const apellido = this.props.navigation.getParam("apellido");
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
    this.getDataURL();
    this.callback();
  }
  getDataURL() {
    this.svg.toDataURL(this.callback);
  }
  callback(dataURL) {
    console.log(dataURL);
  }

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
          {console.log(empleadoID)}
          <QRCode
            value={`spazio72://empleados/${empleadoID}`}
            size={250}
            logoBackgroundColor="transparent"
            getRef={c => (this.svg = c)}
          />
        </View>

        <Button
          rounded
          block
          style={btnStyle}
          onPress={() => this.saveQrToDisk()}
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
