import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Image, Text, StyleSheet, ToastAndroid } from "react-native";
import { Form, Item, Input, Button } from "native-base";
import Spinner from "../components/Spinner";

class App extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    showPasword: true,
    actionAlert: ""
  };

  componentWillMount() {
    const actionAlert = this.props.navigation.getParam("actionAlert");
    actionAlert !== undefined &&
      this.setState({
        actionAlert
      });
  }

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(error => this.onLoginFail(error));
  }

  onLoginSuccess() {
    this.setState({
      email: "",
      password: "",
      error: "",
      loading: false
    });
  }

  onLoginFail(error) {
    this.setState({
      error: `${error.message}`,
      loading: false
    });
  }

  _signUp = () => {
    this.props.navigation.navigate("SignUp");
  };
  _forgotPassword = () => {
    this.props.navigation.navigate("ForgotPassword");
  };

  renderButton() {
    const { btnStyle, textStyle } = styles;
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button
        block
        rounded
        style={btnStyle}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={textStyle}>INGRESAR</Text>
      </Button>
    );
  }

  mostrarContraseña() {
    const { showPasword } = this.state;
    this.setState({ showPasword: !showPasword });
  }

  render() {
    const {
      container,
      logoStyle,
      itemStyle,
      imageStyle,
      inputStyle,
      signupStyle
    } = styles;

    return (
      <View style={container}>
        {this.state.actionAlert !== "" &&
          ToastAndroid.showWithGravity(
            `${this.state.actionAlert}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          )}
        <View style={{ alignItems: "center" }}>
          <Image style={logoStyle} source={require("../images/logo.png")} />
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
              placeholder="Correo"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require("../images/password.png")}
            />
            <Input
              autoCorrect={false}
              secureTextEntry={this.state.showPasword}
              style={inputStyle}
              placeholder="Contraseña"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <Button
              transparent
              onPress={() => {
                this.mostrarContraseña();
              }}
            >
              <Image
                style={imageStyle}
                source={require("../images/eye_black.png")}
              />
            </Button>
          </Item>
        </Form>

        <View style={signupStyle}>
          <Button transparent onPress={this._signUp}>
            <Text style={{ color: "white", fontSize: 10 }}>Registrarse</Text>
          </Button>
          <Button transparent onPress={this._forgotPassword}>
            <Text style={{ color: "white", fontSize: 10 }}>
              Recuperar Contraseña
            </Text>
          </Button>
        </View>

        <View style={{ marginTop: 20 }}>{this.renderButton()}</View>

        <View />

        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282828",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
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
    marginLeft: 10,
    marginRight: 10
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
  logoStyle: {
    width: 350,
    height: 80,
    marginBottom: 40
  },
  signupStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40
  },
  errorText: {
    fontSize: 8,
    alignSelf: "center",
    color: "red"
  }
});

export default App;
