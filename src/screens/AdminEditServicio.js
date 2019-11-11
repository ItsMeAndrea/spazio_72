import React, { Component } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Button } from "native-base";
import app from "../firebase/firebaseConfig";
import _ from "lodash";
import SelectMultiple from "react-native-select-multiple";

class AdminEditServicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicios: [],
      selectedServicios: [],
      serviciosData: []
    };
  }

  static navigationOptions = {
    title: "Servicios Disponibles",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  componentDidMount() {
    const reservacion = this.props.navigation.getParam("reservacion");
    const servicios = reservacion.servicios;
    const empleadoID = reservacion.id;
    const serviciosDataArr = [];

    app
      .database()
      .ref(`empleados/${empleadoID}/selectedServicios`)
      .on("value", snapshot => {
        const servicios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ servicios: servicios });
      });

    this.setState({ selectedServicios: servicios });

    servicios.forEach(servicioID =>
      app
        .database()
        .ref(`servicios/${servicioID.value}`)
        .on("value", snapshot => {
          serviciosDataArr.push(snapshot.val());
          this.setState({ serviciosData: serviciosDataArr });
        })
    );
  }

  onSelectionsChange = selectedServicios => {
    const serviciosID = selectedServicios.map(i => i.value);
    const serviciosDataArr = [];
    serviciosID.forEach(servicioID =>
      app
        .database()
        .ref(`servicios/${servicioID}`)
        .on("value", snapshot => {
          serviciosDataArr.push(snapshot.val());
          this.setState({ serviciosData: serviciosDataArr });
        })
    );

    this.setState({ selectedServicios });
  };

  continueReservation() {
    const reservacion = this.props.navigation.getParam("reservacion");
    const { selectedServicios, serviciosData } = this.state;

    const durationSum = this.state.serviciosData
      .map(i => i.numButton)
      .reduce((a, b) => a + b, 0);

    selectedServicios.length === 0 && serviciosData.length === 0
      ? ToastAndroid.showWithGravity(
          "Debe seleccionar un servicio",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      : this.props.navigation.navigate("EditarBooking", {
          reservacion,
          selectedServicios,
          durationSum
        });
    this.setState({ selectedServicios: [], serviciosData: [] });
  }

  render() {
    const { btnStyle, textStyle } = styles;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#282828"
        }}
      >
        <SelectMultiple
          items={this.state.servicios}
          selectedItems={this.state.selectedServicios}
          onSelectionsChange={this.onSelectionsChange}
          rowStyle={{ backgroundColor: "#282828" }}
          labelStyle={{ color: "white" }}
          checkboxStyle={{ tintColor: "#D5C046" }}
        />

        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => this.continueReservation()}
        >
          <Text style={textStyle}>SIGUIENTE</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828"
  },
  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    marginHorizontal: 30,
    marginBottom: 40
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  }
});

export default AdminEditServicio;
