import React, { Component } from "react";
import _ from "lodash";
import app from "../firebase/firebaseConfig";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Alert,
  ToastAndroid
} from "react-native";
import { Form, Input, Item, Button } from "native-base";
import SelectMultiple from "react-native-select-multiple";

class NuevoEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      correo: "",
      modalVisible: false,
      servicios: [],
      selectedServicios: [],
      serviciosSelect: []
    };
  }

  static navigationOptions = {
    title: "Nuevo Empleado",
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
  }

  transformServicios() {
    const serviciosSelect = this.state.servicios.map(item => {
      return { label: item.nombreServicio, value: item.servicioID };
    });
    this.setState({ serviciosSelect });
  }

  onButtonPress() {
    const { nombre, apellido, correo, selectedServicios } = this.state;

    selectedServicios.length > 0
      ? nombre === "" || apellido === "" || correo === ""
        ? ToastAndroid.showWithGravity(
            "Debe completar todos los campos",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
        : this.generarCodigoQR(nombre, apellido, correo, selectedServicios)
      : ToastAndroid.showWithGravity(
          "Debe seleccionar almenos un servicio.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
  }

  generarCodigoQR(nombre, apellido, correo, selectedServicios) {
    arrayToObject = (array, keyField) =>
      array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
      }, {});
    const objServicios = arrayToObject(selectedServicios, "value");

    const empleadoRef = app
      .database()
      .ref(`empleados/`)
      .push({
        nombre: `${nombre}`,
        apellido: `${apellido}`,
        correo: `${correo}`,
        selectedServicios: objServicios
      });

    const empleadoID = empleadoRef.key;

    app
      .database()
      .ref(`empleados/${empleadoID}`)
      .update({
        empleadoID: empleadoID
      });

    this.props.navigation.navigate("CodigoEmpleado", {
      empleadoID,
      nombre,
      apellido
    });
  }

  onSelectionsPress = selectedServicios => {
    this.setState({ selectedServicios });
  };

  modalVisible(visible) {
    this.transformServicios();
    this.setState({ modalVisible: visible });
  }

  render() {
    const {
      container,
      itemStyle,
      inputStyle,
      imageStyle,
      btnStyle,
      textStyle
    } = styles;
    return (
      <View style={container}>
        <Form>
          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require("../images/username.png")}
            />
            <Input
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
              style={inputStyle}
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
              style={inputStyle}
              placeholder="Correo"
              placeholderTextColor="white"
              value={this.state.correo}
              onChangeText={correo => this.setState({ correo })}
              autoCapitalize="none"
            />
          </Item>
        </Form>

        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => this.modalVisible(!this.state.modalVisible)}
        >
          <Text style={textStyle}>Seleccionar Servicios</Text>
        </Button>
        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => this.onButtonPress()}
        >
          <Text style={textStyle}>Generar Codigo QR</Text>
        </Button>

        {/* MODAL */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.modalVisible(!this.state.modalVisible);
          }}
        >
          <View
            style={{
              backgroundColor: "#00000070",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 350,
                height: 400,
                backgroundColor: "#282828",
                padding: 30,
                borderRadius: 20
              }}
            >
              <SelectMultiple
                items={this.state.serviciosSelect}
                selectedItems={this.state.selectedServicios}
                onSelectionsChange={this.onSelectionsPress}
                rowStyle={{ backgroundColor: "#282828" }}
                labelStyle={{ color: "white" }}
                checkboxStyle={{ tintColor: "#D5C046" }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 20
                }}
              >
                <Button
                  rounded
                  style={{
                    backgroundColor: "#D5C046",
                    color: "white",
                    padding: 20,
                    width: 120,
                    justifyContent: "center"
                  }}
                  onPress={() => {
                    this.modalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={textStyle}>Confirmar</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
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
  imageStyle: {
    height: 20,
    width: 20,
    marginLeft: 10
  },
  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    alignSelf: "center",
    marginHorizontal: 30,
    marginTop: 10
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  }
});
export default NuevoEmpleado;
