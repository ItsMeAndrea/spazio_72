import React, { Component } from "react";
import _ from "lodash";
import app from "../firebase/firebaseConfig";
import { View, StyleSheet, Text, Modal, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "native-base";

class BookingSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      slots: [{ isAvailable: true, slot: "8:00 AM" }],
      userReservation: {
        slotID: "",
        slot: "",
        isAvailable: true,
        dia: "",
        mes: "",
        año: "",
        nEmpleado: "",
        aEmpleado: "",
        empleadoID: "",
        aUsuario: "",
        nUsuario: "",
        eUsuario: "",
        usuarioID: ""
      }
    };

    this.onScrollPress = this.onScrollPress.bind(this);
    this.hacerReservacion = this.hacerReservacion.bind(this);
  }

  componentWillMount() {
    const { currentUser } = app.auth();
    const reservacion = this.props.navigation.getParam("reservacion");
    const { dia, mes, año, id } = reservacion;
    app
      .database()
      .ref(`/empleados/${id}/reservaciones/${año}/${mes}/${dia}/slots`)
      .on("value", snapshot => {
        const slots = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ slots: slots });
      });

    app
      .database()
      .ref(`usuarios/${currentUser.uid}/datos`)
      .on("value", snapshot => {
        const userInfo = snapshot.val();
        this.setState({ userInfo: userInfo });
      });
  }

  static navigationOptions = {
    title: "Seleccione la hora",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  onScrollPress(items, index) {
    const usuarioID = app.auth().currentUser.uid;
    const reservacion = this.props.navigation.getParam("reservacion");
    const { dia, mes, año, nEmpleado, aEmpleado, id } = reservacion;
    const { nombre, apellido, email } = this.state.userInfo;
    const available = () => {
      return items.isAvailable ? false : true;
    };
    items.isAvailable = available();
    const slotID = `slot${index}`;

    this.setState({
      userReservation: {
        slotID: slotID,
        slot: items.slot,
        isAvailable: items.isAvailable,
        dia: dia,
        mes: mes,
        año: año,
        nEmpleado: nEmpleado,
        aEmpleado: aEmpleado,
        empleadoID: id,
        nUsuario: nombre,
        aUsuario: apellido,
        eUsuario: email,
        usuarioID: usuarioID
      }
    });
  }

  hacerReservacion() {
    const reservacion = this.props.navigation.getParam("reservacion");
    const { id } = reservacion;
    const { userReservation } = this.state;
    const { año, mes, dia, slotID, isAvailable } = userReservation;
    const { currentUser } = app.auth();

    const reservaRef = app
      .database()
      .ref(`/usuarios/${currentUser.uid}/reservas`)
      .push({ userReservation });

    const reservaID = reservaRef.key;

    app
      .database()
      .ref(`/usuarios/${currentUser.uid}/reservas/${reservaID}`)
      .update({
        userReservation: { ...userReservation, reservaID: reservaID }
      });

    app
      .database()
      .ref("reservas/")
      .push({ userReservation: { ...userReservation, reservaID: reservaID } });

    app
      .database()
      .ref(
        `/empleados/${id}/reservaciones/${año}/${mes}/${dia}/slots/${slotID}`
      )
      .update({ isAvailable: isAvailable });
    this.props.navigation.navigate("Home");
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {
      container,
      scrollBtnStyle,
      scrollContainer,
      scrollTextStyle,
      scrollBtnDisable,
      btnStyle,
      textStyle
    } = styles;
    const reservacion = this.props.navigation.getParam("reservacion");
    const { dia, mes } = reservacion;
    return (
      <View style={container}>
        <ScrollView contentContainerStyle={scrollContainer}>
          <View>
            {this.state.slots.map((items, index) => {
              return (
                <Button
                  key={items.slot}
                  rounded
                  active={items.isAvailable}
                  style={items.isAvailable ? scrollBtnStyle : scrollBtnDisable}
                  onPress={() => this.onScrollPress(items, index)}
                >
                  <Text style={scrollTextStyle}>{items.slot}</Text>
                </Button>
              );
            })}
          </View>
        </ScrollView>
        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <Text style={textStyle}>ACEPTAR</Text>
        </Button>
        {/* MODAL */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
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
                height: 220,
                backgroundColor: "#282828",
                padding: 30,
                borderRadius: 20
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center"
                }}
              >
                Su reservacion se hara con:
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center"
                }}
              >
                {this.state.userReservation.nEmpleado}{" "}
                {this.state.userReservation.aEmpleado} a las{" "}
                {this.state.userReservation.slot}, el dia {dia}/{mes}.
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center"
                }}
              >
                ¿Desea continuar?
              </Text>
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
                  onPress={() => this.hacerReservacion()}
                >
                  <Text style={textStyle}>Aceptar</Text>
                </Button>

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
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={textStyle}>Cancelar</Text>
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
    backgroundColor: "#282828"
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center"
  },
  scrollBtnStyle: {
    backgroundColor: "#D5C046",
    marginBottom: 10,
    height: 40,
    width: 200,
    justifyContent: "center"
  },
  scrollTextStyle: {
    color: "white",
    fontSize: 16
  },
  scrollBtnDisable: {
    backgroundColor: "gray",
    marginBottom: 10,
    height: 40,
    width: 200,
    justifyContent: "center"
  },
  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    marginHorizontal: 30,
    marginBottom: 10,
    marginTop: 10
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  }
});

export default BookingSlots;
