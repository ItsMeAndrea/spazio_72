import _ from "lodash";
import app from "../firebase/firebaseConfig";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ToastAndroid
} from "react-native";
import { Button, Form, Input, Item } from "native-base";
import Share from "react-native-share";
import SelectMultiple from "react-native-select-multiple";

class EditarEmpleado extends Component {
  static navigationOptions = {
    title: "Editar Empleado",
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
    this.state = {
      empleado: [],
      nombre: "",
      apellido: "",
      correo: "",
      servicios: [],
      selectedServicios: [],
      serviciosSelect: [],
      modalVisible: false
    };
  }
  svg;

  componentWillMount() {
    const empleado = this.props.navigation.getParam("item");
    const { nombre, apellido, correo, selectedServicios } = empleado;
    const servicioArr = Object.values(selectedServicios);

    app
      .database()
      .ref(`servicios/`)
      .on("value", snapshot => {
        const servicios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ servicios: servicios });
      });

    this.setState({
      empleado,
      nombre,
      apellido,
      correo,
      selectedServicios: servicioArr
    });
  }

  transformServicios() {
    const serviciosSelect = this.state.servicios.map(item => {
      return { label: item.nombreServicio, value: item.servicioID };
    });
    this.setState({ serviciosSelect });
  }

  modalVisible(visible) {
    this.transformServicios();
    this.setState({ modalVisible: visible });
  }
  onSelectionsPress = selectedServicios => {
    this.setState({ selectedServicios });
  };

  onButtonPress() {
    const empleado = this.state.empleado;
    const { nombre, apellido, qrData } = empleado;
    const shareImageBase64 = {
      title: "QR",
      message: `Codigo QR para ${nombre} ${apellido}`,
      url: `data:image/png;base64,${qrData}`
    };
    Share.open(shareImageBase64)
      .then(() => {
        this.props.navigation.navigate("VerEmpleados");
      })
      .catch(() => {
        ToastAndroid.showWithGravity(
          "No se pudo descargar el codigo QR",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  }

  onGuardarPress() {
    const {
      nombre,
      apellido,
      correo,
      selectedServicios,
      empleado
    } = this.state;
    const actionAlert = "El empleado fue editado correctamente";

    selectedServicios.length > 0
      ? (app
          .database()
          .ref(`empleados/`)
          .child(`${empleado.empleadoID}`)
          .update({ nombre, apellido, correo, selectedServicios }),
        this.props.navigation.navigate("VerEmpleados", { actionAlert }))
      : ToastAndroid.showWithGravity(
          "Debe seleccionar almenos un servicio.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
  }
  render() {
    const {
      itemStyle,
      imageStyle,
      inputStyle,
      btnStyle,
      textStyle,
      btnStyleGuardar
    } = styles;
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
              style={inputStyle}
              placeholder="Correo"
              placeholderTextColor="white"
              value={this.state.correo}
              onChangeText={correo => this.setState({ correo })}
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
          <Text style={textStyle}>Descargar QR</Text>
        </Button>

        <Button
          block
          rounded
          style={btnStyleGuardar}
          onPress={() => this.onGuardarPress()}
        >
          <Text style={textStyle}>Guardar Cambios</Text>
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
    alignSelf: "center",
    marginHorizontal: 30,
    marginTop: 10
  },
  btnStyleGuardar: {
    backgroundColor: "#D5C046",
    color: "white",
    alignSelf: "center",
    marginHorizontal: 30,
    marginTop: 50
  },
  textStyle: {
    fontSize: 15,
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

  errorText: {
    fontSize: 8,
    alignSelf: "center",
    color: "red"
  }
});

export default EditarEmpleado;
