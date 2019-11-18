import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ToastAndroid,
  Keyboard
} from "react-native";
import { Form, Item, Input, Button } from "native-base";
import app from "../firebase/firebaseConfig";

export default class App extends Component {
  static navigationOptions = {
    title: "Recuperar Contraseña",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  state = {
    email: ""
  };

  onButtonPress() {
    const { email } = this.state;

    Keyboard.dismiss();

    app
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.props.navigation.navigate("Login");
        ToastAndroid.showWithGravity(
          "Hemos enviado el correo con exito.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      })
      .catch(error => {
        error.code === "auth/invalid-email" &&
          ToastAndroid.showWithGravity(
            "Ingrese un correo valido",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );

        error.code === "auth/user-not-found" &&
          ToastAndroid.showWithGravity(
            "El correo no se encuentra registrado",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );

        error.code === "auth/network-request-failed" &&
          ToastAndroid.showWithGravity(
            "Verifique la conexion a Internet",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
      });
  }
  render() {
    const {
      container,
      itemStyle,
      imageStyle,
      inputStyle,
      btnStyle,
      textStyle,
      paragraphStyle,

      formPosition
    } = styles;
    return (
      <View style={container}>
        <View style={formPosition}>
          <View style={paragraphStyle}>
            <Text style={textStyle}>
              Ingrese su Correo Electronico para poder restablecer su contraseña
            </Text>
          </View>
          <Form>
            <Item rounded style={itemStyle}>
              <Image
                style={imageStyle}
                source={require("../images/username.png")}
              />

              <Input
                autoCorrect={false}
                style={inputStyle}
                placeholder="Correo "
                placeholderTextColor="white"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                autoCapitalize="none"
              />
            </Item>
          </Form>
          <View>
            <Button
              block
              rounded
              style={btnStyle}
              onPress={() => this.onButtonPress()}
            >
              <Text style={textStyle}>Enviar</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  _Login = () => {
    this.props.navigation.navigate("Login");
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282828",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  paragraphStyle: {
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  itemStyle: {
    backgroundColor: "gray",
    opacity: 0.8,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    color: "white"
  },
  imageStyle: {
    height: 30,
    width: 30,
    marginLeft: 10
  },
  inputStyle: {
    color: "white",
    fontSize: 10
  },
  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30
  },
  textStyle: {
    fontSize: 15,
    color: "white"
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
  backBtnStyle: {
    height: 20,
    width: 20
  },
  formPosition: {
    justifyContent: "center",
    flex: 8
  }
});
