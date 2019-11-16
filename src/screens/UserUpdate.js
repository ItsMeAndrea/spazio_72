import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Keyboard
} from "react-native";
import { Form, Input, Item, Button, Label } from "native-base";
import app from "../firebase/firebaseConfig";

class UserUpdate extends Component {
  static navigationOptions = {
    title: "Perfil del Usuario",
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
      nombre: "",
      apellido: "",
      correo: "",
      disable: true,
      isEditable: false
    };
  }

  componentWillMount() {
    const { currentUser } = app.auth();
    this.setState({
      nombre: currentUser.displayName,
      correo: currentUser.email
    });

    app
      .database()
      .ref(`usuarios/${currentUser.uid}/datos`)
      .on("value", snapshot => {
        this.setState({ apellido: snapshot.val().apellido });
      });
  }

  onEditarButtonPress() {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable,
      disable: !prevState.disable
    }));
  }

  onGuardarButtonPress() {
    const { nombre, apellido, correo } = this.state;
    const { currentUser } = app.auth();

    nombre === "" || apellido === "" || correo === ""
      ? ToastAndroid.showWithGravity(
          "Todos los campos deben ser completados",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      : (currentUser.updateProfile({
          displayName: nombre
        }),
        currentUser
          .updateEmail(correo)
          .then(
            ToastAndroid.showWithGravity(
              "Su perfil se ha actulizado con exito",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            ),
            this.databaseUpdate(nombre, apellido, correo)
          )
          .catch(
            error => {
              ToastAndroid.showWithGravity(
                `${error.message}`,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
            },
            this.setState(prevState => ({
              isEditable: !prevState.isEditable,
              disable: !prevState.disable
            }))
          ));
  }

  databaseUpdate(nombre, apellido, correo) {
    const { currentUser } = app.auth();
    app
      .database()
      .ref(`usuarios/${currentUser.uid}/datos`)
      .update({
        nombre: nombre,
        apellido: apellido,
        email: correo
      })
      .catch(error => {
        ToastAndroid.showWithGravity(
          `${error.message}`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      });
  }

  renderButton() {
    const { btnStyle, textStyle } = styles;
    if (this.state.isEditable) {
      return (
        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => this.onGuardarButtonPress()}
        >
          <Text style={textStyle}>Guardar</Text>
        </Button>
      );
    } else {
      return (
        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => this.onEditarButtonPress()}
        >
          <Text style={textStyle}>Editar</Text>
        </Button>
      );
    }
  }
  render() {
    const {
      container,
      formPosition,
      inputTextStyle,
      inputTextStyleDisable
    } = styles;
    return (
      <View style={container}>
        <Form style={formPosition}>
          <Item stackedLabel>
            <Label style={{ fontSize: 10 }}>Nombre</Label>
            <Input
              disabled={this.state.disable}
              autoCorrect={false}
              style={
                this.state.disable ? inputTextStyleDisable : inputTextStyle
              }
              placeholder="Nombre"
              placeholderTextColor="white"
              value={this.state.nombre}
              onChangeText={nombre => this.setState({ nombre })}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 10 }}>Apellido</Label>
            <Input
              disabled={this.state.disable}
              autoCorrect={false}
              style={
                this.state.disable ? inputTextStyleDisable : inputTextStyle
              }
              placeholder="Nombre"
              placeholderTextColor="white"
              value={this.state.apellido}
              onChangeText={apellido => this.setState({ apellido })}
            />
          </Item>
          <Item stackedLabel>
            <Label style={{ fontSize: 10 }}>Correo Electronico</Label>
            <Input
              disabled={this.state.disable}
              autoCorrect={false}
              style={
                this.state.disable ? inputTextStyleDisable : inputTextStyle
              }
              placeholder="Nombre"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={this.state.correo}
              onChangeText={correo => this.setState({ correo })}
            />
          </Item>
        </Form>
        {this.renderButton()}
        <Button
          transparent
          style={{ alignSelf: "center" }}
          onPress={() => app.auth().signOut()}
        >
          <Text style={{ color: "white", fontSize: 10 }}>Cerrar Sesión</Text>
        </Button>
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
  inputTextStyle: {
    color: "white",
    fontSize: 15
  },
  inputTextStyleDisable: {
    color: "gray",
    fontSize: 15
  },

  formPosition: {
    justifyContent: "center",
    marginTop: 60
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
    marginHorizontal: 30,
    marginTop: 30
  },
  textStyle: {
    fontSize: 18,
    color: "white"
  }
});

export default UserUpdate;
