import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import _ from "lodash";
import { FlatList, View } from "react-native";

import UsuariosItem from "../components/UsuariosItem";

class VerUsuarios extends Component {
  static navigationOptions = {
    title: "Usuarios",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      usuarios: []
    };
  }

  componentWillMount() {
    app
      .database()
      .ref("usuarios/")
      .on("value", snapshot => {
        const usuarios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ usuarios: usuarios });
      });
  }

  onEdit = item => {
    this.props.navigation.navigate("EditarUsuario", { item });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        <FlatList
          data={this.state.usuarios}
          renderItem={({ item }) => (
            <UsuariosItem onEdit={this.onEdit} usuario={item.datos} />
          )}
          keyExtractor={item => item.datos.email}
        />
      </View>
    );
  }
}

export default VerUsuarios;
