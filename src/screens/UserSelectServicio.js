import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import app from "../firebase/firebaseConfig";
import _ from "lodash";
import SelectMultiple from "react-native-select-multiple";

class UserSelectServicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicios: [],
      selectedServicios: []
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
    const userID = this.props.navigation.getParam("id");
    app
      .database()
      .ref(`empleados/${userID}/selectedServicios`)
      .on("value", snapshot => {
        const servicios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ servicios: servicios });
      });
  }

  onSelectionsChange = selectedServicios => {
    this.setState({ selectedServicios });
  };

  continueReservation() {
    const reservacion = this.props.navigation.getParam("reservacion");
    const selectedServicios = this.state;
    this.props.navigation.navigate("Booking", {
      reservacion,
      selectedServicios
    });
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

export default UserSelectServicio;
