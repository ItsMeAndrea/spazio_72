import React, { Component } from "react";
import _ from "lodash";
import app from "../firebase/firebaseConfig";
import { View, Text, FlatList } from "react-native";

import ServiciosItem from "../components/ServiciosItem";

class VerServicios extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      servicios: []
    };
  }

  static navigationOptions = {
    title: "Servicios",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  componentDidMount() {
    app
      .database()
      .ref("servicios/")
      .on("value", snapshot => {
        const servicios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ servicios: servicios });
      });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        <FlatList
          data={this.state.servicios}
          renderItem={({ item }) => <ServiciosItem servicios={item} />}
          keyExtractor={item => item.nombreServicio}
        />
      </View>
    );
  }
}

export default VerServicios;
