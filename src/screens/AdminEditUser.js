import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Form, Input, Item, Button } from "native-base";

class AdminEditUser extends Component {
  static navigationOptions = {
    title: "Editar Usuario",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white",

      flex: 1
    }
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const usuario = this.props.navigation.getParam("item");
    this.setState({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email
    });
  }
  render() {
    const { itemStyle, imageStyle, inputStyle } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        <Form
          style={{
            justifyContent: "center",
            marginTop: 60
          }}
        >
          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require("../images/username.png")}
            />
            <Input
              autoCorrect={false}
              style={inputStyle}
              placeholder="Nombre"
              placeholderTextColor="white"
              value={this.state.nombre}
              onChangeText={nombre => this.setState({ nombre })}
            />
          </Item>

          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require("../images/username.png")}
            />
            <Input
              autoCorrect={false}
              style={inputStyle}
              placeholder="apellido"
              placeholderTextColor="white"
              value={this.state.apellido}
              onChangeText={apellido => this.setState({ apellido })}
            />
          </Item>

          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require("../images/username.png")}
            />
            <Input
              autoCorrect={false}
              style={inputStyle}
              placeholder="email"
              placeholderTextColor="white"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282828",
    flex: 1,
    flexDirection: "column"
  },
  itemStyle: {
    backgroundColor: "gray",
    opacity: 0.8,
    marginRight: 30,
    marginLeft: 30,
    height: 30,
    marginBottom: 10,
    color: "white"
  },
  imageStyle: {
    height: 20,
    width: 20,
    marginLeft: 10
  },
  inputStyle: {
    color: "white",
    fontSize: 10
  },
  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    marginHorizontal: 30
  },
  textStyle: {
    fontSize: 18,
    color: "white"
  },
  backBtnStyle: {
    height: 20,
    width: 20
  },
  formPosition: {
    justifyContent: "center",
    marginTop: 60
  },
  backButtonPosition: {
    justifyContent: "flex-end",
    flex: 1,
    marginLeft: 30,
    marginBottom: 30
  },
  backButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    backgroundColor: "#D5C046"
  },
  errorText: {
    fontSize: 8,
    alignSelf: "center",
    color: "red"
  }
});

export default AdminEditUser;
