import React, { Component } from "react";
import _ from "lodash";
import app from "../firebase/firebaseConfig";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Form, Input, Item, Button, Picker, Icon, Label } from "native-base";

class NuevoServicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDuracion: 0,
      nombre: "",
      precio: "",
      servicios: [],
      errorServicio: "",
      tasa: ""
    };
  }

  static navigationOptions = {
    title: "Nuevo Servicio",
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
      .ref(`servicios/`)
      .on("value", snapshot => {
        const servicios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ servicios: servicios });
      });

    app
      .database()
      .ref("tasaDolar")
      .on("value", snapshot => {
        const tasa = snapshot.val();
        this.setState({ tasa: tasa.tasa });
      });
  }

  onValueChange(value) {
    this.setState({
      selectDuracion: value
    });
  }

  onButtonPress() {
    const { nombre, precio, selectDuracion, servicios, tasa } = this.state;
    const duracion = arrDuracion[selectDuracion];
    const capFirstLetter = nombre
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    const arrservicioExiste = servicios.map(servicio => {
      return servicio.nombreServicio === capFirstLetter ? true : false;
    });
    const servicioExiste = arrservicioExiste.every(elem => elem === false);

    const tasaformat = tasa.split(",").join("");
    const precioNum = Number(precio);
    const tasaNum = Number(tasaformat);
    const precioBs = precioNum * tasaNum;

    servicioExiste
      ? nombre !== "" && precio !== ""
        ? this.registrarServicio(
            capFirstLetter,
            precioNum,
            selectDuracion,
            duracion,
            precioBs
          )
        : ToastAndroid.showWithGravity(
            "Todos los campos deben ser completados",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
      : ToastAndroid.showWithGravity(
          "El servicio ya se encuentra Registrado",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
  }

  registrarServicio(
    capFirstLetter,
    precio,
    selectDuracion,
    duracion,
    precioBs
  ) {
    const actionAlert = "El servicio fue registrado con exito";
    const servicioRef = app
      .database()
      .ref(`servicios/`)
      .push(
        {
          nombreServicio: capFirstLetter,
          precioServicio: precio,
          numButton: selectDuracion + 1,
          duracion: duracion,
          precioBs: precioBs
        },
        error => {
          error
            ? console.log("error")
            : (this.props.navigation.navigate("VerServicios", { actionAlert }),
              this.setState({ errorServicio: "" }));
        }
      );
    const servicioID = servicioRef.key;
    app
      .database()
      .ref(`servicios/${servicioID}`)
      .update({ servicioID: servicioID });
  }

  render() {
    const {
      container,
      itemStyle,
      inputStyle,
      errorText,
      btnStyle,
      textStyle
    } = styles;
    return (
      <View style={container}>
        <Form>
          <Item rounded style={itemStyle}>
            <Input
              style={inputStyle}
              placeholder="Nombre del Servicio"
              placeholderTextColor="white"
              value={this.state.nombre}
              onChangeText={nombre => this.setState({ nombre })}
            />
          </Item>

          <Item rounded style={itemStyle}>
            <Input
              style={inputStyle}
              placeholder="Precio ($)"
              placeholderTextColor="white"
              value={this.state.precio}
              onChangeText={precio => this.setState({ precio })}
              keyboardType={"number-pad"}
            />
          </Item>

          <Item
            picker
            style={{
              marginLeft: 40,
              width: 250,
              marginBottom: 10
            }}
          >
            <Label style={{ color: "white" }}>Duracion</Label>
            <Picker
              mode="dropdown"
              placeholder="Seleccione la duracion del servicio"
              placeholderStyle={{ color: "white" }}
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100, color: "white" }}
              selectedValue={this.state.selectDuracion}
              onValueChange={this.onValueChange.bind(this)}
            >
              {arrDuracion.map((duracion, index) => {
                return (
                  <Picker.Item label={duracion} value={index} key={index} />
                );
              })}
            </Picker>
          </Item>
        </Form>
        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => this.onButtonPress()}
        >
          <Text style={textStyle}>Registrar Servicio</Text>
        </Button>
        <Text style={errorText}>{this.state.errorServicio}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
    justifyContent: "center"
  },
  itemStyle: {
    backgroundColor: "gray",
    opacity: 0.8,
    marginRight: 30,
    marginLeft: 30,
    height: 40,
    marginBottom: 10,
    color: "white"
  },
  inputStyle: {
    color: "white",
    fontSize: 12
  },

  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    alignSelf: "center",
    marginHorizontal: 30
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  },
  errorText: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 10,
    color: "red",
    alignSelf: "center"
  }
});

const arrDuracion = [
  "0h 30m",
  "1h 0m",
  "1h 30m",
  "2h 0m",
  "2h 30m",
  "3h 0m",
  "3h 30m",
  "4h 0m",
  "4h 30m",
  "5h 0m"
];
export default NuevoServicio;
