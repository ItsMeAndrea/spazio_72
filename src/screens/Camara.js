"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, Linking } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

export default class ScanScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: "Escaner de Codigo QR",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white",
      flex: 1
    }
  };
  onSuccess(e) {
    Linking.openURL(e.data).catch(err =>
      console.error("An error occured", err)
    );
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        containerStyle={{ backgroundColor: "#282828" }}
        topContent={
          <Text style={styles.centerText}>
            ¡Enfoca el codigo QR y haz tu cita!
          </Text>
        }
        cameraProps={{ ratio: "1:1" }}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 10
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});
