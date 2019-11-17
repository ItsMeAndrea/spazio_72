import React, { Component } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Button } from "native-base";
import app from "../firebase/firebaseConfig";
import _ from "lodash";
import SelectMultiple from "react-native-select-multiple";

class EditServicios extends Component {
  static navigationOptions = {
    title: "Servicios Disponibles",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      servicios: [],
      selectedServicios: [],
      serviciosData: [],
      totalServiciosData: []
    };
  }

  componentWillMount() {
    const reservacion = this.props.navigation.getParam("reservacion");
    app
      .database()
      .ref(`empleados/${reservacion.id}/selectedServicios`)
      .on("value", snapshot => {
        const servicios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ servicios: servicios });
      });
  }

  componentDidMount() {
    const reservacion = this.props.navigation.getParam("reservacion");
    const selectedServicios = reservacion.servicios;
    const { servicios } = this.state;
    const serviciosID = servicios.map(i => i.value);
    const serviciosDataArr = [];
    const totalServiciosDataArr = [];

    serviciosID.forEach(servicioID =>
      app
        .database()
        .ref(`servicios/${servicioID}`)
        .on("value", snapshot => {
          totalServiciosDataArr.push(snapshot.val());
          this.setState({ totalServiciosData: totalServiciosDataArr });
        })
    );

    this.setState({ selectedServicios: selectedServicios });

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
      : this.props.navigation.navigate("EditBooking", {
          reservacion,
          selectedServicios,
          durationSum
        });
    this.setState({ selectedServicios: [], serviciosData: [] });
  }

  renderLabel = (label, style) => {
    const { totalServiciosData } = this.state;

    const servicioObj = totalServiciosData.find(obj => {
      return obj.nombreServicio === label;
    });

    const precioFormat =
      servicioObj === undefined
        ? ""
        : servicioObj.precioBs
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    const precioDolarCheck =
      servicioObj === undefined ? "" : servicioObj.precioServicio;
    const duracionCheck = servicioObj === undefined ? "" : servicioObj.duracion;

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginLeft: 10 }}>
          <Text style={style}>{label} </Text>
          <Text style={{ color: "white", fontSize: 10 }}>
            Precio: $ {precioDolarCheck} ~ BsS. {precioFormat}
          </Text>
          <Text style={{ color: "white", fontSize: 10 }}>
            Duracion: {duracionCheck}
          </Text>
        </View>
      </View>
    );
  };

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
          renderLabel={this.renderLabel}
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

export default EditServicios;
