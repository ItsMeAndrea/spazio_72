import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Image, Text, StyleSheet } from "react-native";
import { Form, Input, Item, Button } from "native-base";
import Spinner from "../components/Spinner";

class SignUp extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    isAdmin: false
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.onSignUpSuccess.bind(this))
      .catch(this.onSignUpFail.bind(this));
  }

  onSignUpSuccess() {
    const { nombre, apellido, email, isAdmin } = this.state;
    const { currentUser } = app.auth();
    app
      .database()
      .ref(`/usuarios/${currentUser.uid}`)
      .set({ datos: { nombre, apellido, email, isAdmin } });
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: ""
    });
  }

  onSignUpFail() {
    this.setState({
      error: "Autenticacion fallida",
      loading: false
    });
  }

  _Login = () => {
    this.props.navigation.navigate("Login");
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
        <Text style={textStyle}>REGISTRAR</Text>
      </Button>
    );
  }

  render() {
    const {
      container,
      itemStyle,
      inputStyle,
      imageStyle,
      backBtnStyle,
      formPosition,
      backButtonPosition,
      backButton
    } = styles;
    return (
      <View style={container}>
        <View style={formPosition}>
          <Form>
            <Item rounded style={itemStyle}>
              <Image
                style={imageStyle}
                source={require("../images/username.png")}
              />
              <Input
                autoCorrect={false}
                style={styles.inputStyle}
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
                style={styles.inputStyle}
                placeholder="Apellido"
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
                style={styles.inputStyle}
                placeholder="Ingrese Correo Electronico"
                placeholderTextColor="white"
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
                secureTextEntry
                style={inputStyle}
                placeholder="Contraseña"
                placeholderTextColor="white"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>

            {/*           <Item rounded style={itemStyle}>
              <Image
                style={imageStyle}
                source={require('../images/password.png')}
              />
              <Input
                autoCorrect={false}
                secureTextEntry
                style={inputStyle}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="white"
              />
            </Item> */}
          </Form>

          <View style={{ marginTop: 20 }}>{this.renderButton()}</View>
        </View>

        <Text style={styles.errorText}>{this.state.error}</Text>

        <View style={backButtonPosition}>
          <Button rounded style={backButton} onPress={this._Login}>
            <Image
              style={backBtnStyle}
              source={require("../images/left-arrow.png")}
            />
          </Button>
        </View>
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
    flex: 8
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

export default SignUp;
