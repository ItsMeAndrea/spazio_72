import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid
} from "react-native";
import { Form, Input, Item, Button } from "native-base";
import Spinner from "../components/Spinner";

class SignUp extends Component {
  static navigationOptions = {
    title: "Registarse",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  state = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    loading: false,
    isAdmin: false,
    confirmarPassword: "",
    validarContraseña: false
  };

  onButtonPress() {
    const {
      email,
      password,
      confirmarPassword,
      validarContraseña
    } = this.state;

    this.verificarContraseña(password, confirmarPassword);

    this.setState({ error: "", loading: true });

    email === "" && password === ""
      ? (ToastAndroid.showWithGravity(
          "Todos los campos deben ser completados",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        ),
        this.setState({ loading: false }))
      : validarContraseña
      ? app
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onSignUpSuccess.bind(this))
          .catch(error => this.onSignUpFail(error))
      : (ToastAndroid.showWithGravity(
          "Las contraseña no son iguales",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        ),
        this.setState({ loading: false }));
  }

  onSignUpSuccess() {
    const { nombre, apellido, email, isAdmin, confirmarPassword } = this.state;
    const { currentUser } = app.auth();

    nombre === "" && apellido === ""
      ? ToastAndroid.showWithGravity(
          "Todos los campos deben ser completados",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      : (app
          .database()
          .ref(`/usuarios/${currentUser.uid}`)
          .set({ datos: { nombre, apellido, email, isAdmin } }, error => {
            error ? console.log(error) : this.sendEmail();
          }),
        currentUser.updateProfile({
          displayName: nombre
        }));

    this.setState({
      email: "",
      password: "",
      loading: false,
      confirmarPassword: ""
    });
  }

  sendEmail() {
    const user = app.auth().currentUser;
    user
      .sendEmailVerification()
      .then(
        this.props.navigation.navigate("Login"),
        ToastAndroid.showWithGravity(
          "Hemos enviado el correo de verificacion con exito",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        )
      )
      .catch(error =>
        error
          ? console.log(error)
          : this.props.navigation.navigate("Login", { actionAlert })
      );
  }

  onSignUpFail(error) {
    error.code === "auth/invalid-email" &&
      ToastAndroid.showWithGravity(
        "El correo ingresado no es valido",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    console.log(error);

    error.code === "auth/weak-password" &&
      ToastAndroid.showWithGravity(
        "La contraseña debe tener mas de 6 caracteres.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

    error.code === "auth/email-already-in-use" &&
      ToastAndroid.showWithGravity(
        "El correo ingresado ya esta registrado",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

    this.setState({
      loading: false
    });
  }

  _Login = () => {
    this.props.navigation.navigate("Login");
  };

  renderButton() {
    const { btnDisable } = this.state;
    const { btnStyle, textStyle } = styles;
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button
        disabled={btnDisable}
        block
        rounded
        style={btnStyle}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={textStyle}>REGISTRAR</Text>
      </Button>
    );
  }

  verificarContraseña(password, confirmarPassword) {
    password === confirmarPassword
      ? this.setState({
          validarContraseña: true
        })
      : this.setState({
          validarContraseña: false
        });
  }

  render() {
    const {
      container,
      itemStyle,
      inputStyle,
      imageStyle,
      formPosition
    } = styles;
    return (
      <ScrollView contentContainerStyle={container}>
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
                autoCapitalize="none"
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

            <Item rounded style={itemStyle}>
              <Image
                style={imageStyle}
                source={require("../images/password.png")}
              />
              <Input
                autoCorrect={false}
                secureTextEntry
                style={inputStyle}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="white"
                value={this.state.confirmarPassword}
                onChangeText={confirmarPassword =>
                  this.setState({ confirmarPassword })
                }
              />
            </Item>
          </Form>

          <View style={{ marginTop: 20 }}>{this.renderButton()}</View>
        </View>
      </ScrollView>
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

export default SignUp;
