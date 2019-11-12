import React, { Component } from "react";
import _ from "lodash";
import app from "../firebase/firebaseConfig";
import { View, FlatList, ToastAndroid } from "react-native";
import { HeaderBackButton } from "react-navigation";

import ServiciosItem from "../components/ServiciosItem";

class VerServicios extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Servicios",
      headerStyle: {
        backgroundColor: "#282828"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("Home")} />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      servicios: []
    };
  }

  componentWillMount() {
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

  onEdit = item => {
    this.props.navigation.navigate("EditAdminServ", { item });
  };

  render() {
    const actionAlert = this.props.navigation.getParam("actionAlert");
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        {actionAlert !== undefined &&
          ToastAndroid.showWithGravity(
            `${actionAlert}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          )}
        <FlatList
          data={this.state.servicios}
          renderItem={({ item }) => (
            <ServiciosItem onEdit={this.onEdit} servicios={item} />
          )}
          keyExtractor={item => item.nombreServicio}
        />
      </View>
    );
  }
}

export default VerServicios;
