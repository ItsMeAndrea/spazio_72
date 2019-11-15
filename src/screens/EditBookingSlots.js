import React, { Component } from "react";
import _ from "lodash";
import app from "../firebase/firebaseConfig";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  ToastAndroid
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "native-base";

class EditBookingSlots extends Component {
  static navigationOptions = {
    title: "Edita tu reservación",
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
      modalVisible: false,
      slots: [{ isAvailable: true, slot: "8:00 AM" }],
      finalSlots: [],
      selectedSlots: [{ slotID: "", slot: "", isAvailable: true }],
      selectedSlotsArr: [],
      duracion: "",
      userReservation: {
        slotID: "",
        slot: "",
        isAvailable: true,
        dia: "",
        mes: "",
        año: "",
        nEmpleado: "",
        aEmpleado: "",
        empleadoID: ""
      }
    };

    this.onScrollPress = this.onScrollPress.bind(this);
    this.hacerReservacion = this.hacerReservacion.bind(this);
  }

  componentWillMount() {
    const { currentUser } = app.auth();
    const reservacion = this.props.navigation.getParam("reservacion");
    const { dia, mes, año, id, reservaID } = reservacion;
    const durationSum = this.props.navigation.getParam("durationSum");
    const duracion = duracionArr[durationSum];
    this.setState({ duracion: duracion });

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
    app
      .database()
      .ref(`usuarios/${currentUser.uid}/reservas`)
      .on("value", snapshot => {
        const slotsUsuario = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ slotsUsuario });
      });
  }

  componentDidMount() {
    const { slots, slotsUsuario } = this.state;
    const slotsUsuarioNoDiponibles = slotsUsuario
      .map(i => {
        return i.userReservation.slot;
      })
      .flat();

    const result = slots
      .filter(a => !slotsUsuarioNoDiponibles.some(s => s.slotID == a.slotID))
      .concat(slotsUsuarioNoDiponibles);

    result.sort((a, b) => {
      return a.slotID - b.slotID;
    });

    this.setState({ finalSlots: result });
  }

  onScrollPress(items, index) {
    const usuarioID = app.auth().currentUser.uid;
    const reservacion = this.props.navigation.getParam("reservacion");
    const durationSum = this.props.navigation.getParam("durationSum");
    const selectedServicios = this.props.navigation.getParam(
      "selectedServicios"
    );
    const { dia, mes, año, nEmpleado, aEmpleado, id } = reservacion;
    const { nombre, apellido, email } = this.state.userInfo;
    const slotID = index;
    const endArr = index + durationSum;

    const selectedSlots = this.state.finalSlots.slice(index, endArr);
    const slotKey = selectedSlots.map(i => i.slotID);
    const tmp = this.state.selectedSlots.map(i => i.slotID);
    const slotArray = this.state.finalSlots
      .slice(index, endArr)
      .map(i => i.slot);

    const isAvailableArr = selectedSlots.map(i => {
      return i.isAvailable ? false : true;
    });
    const isAvailable = isAvailableArr.every(i => i === true);

    slotKey.map(i => {
      tmp.includes(i)
        ? this.setState({
            selectedSlots: [],
            selectedSlotsArr: []
          })
        : this.setState({
            selectedSlots: selectedSlots,
            selectedSlotsArr: slotArray
          });
    });

    const slot = selectedSlots.map((i, index) => {
      return {
        slotID: index + slotID,
        slot: i.slot,
        isAvailable: isAvailable,
        start: i.start,
        end: i.end
      };
    });

    this.setState({
      userReservation: {
        servicios: selectedServicios,
        slot: slot,
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
    const { reservaID } = reservacion;
    const { userReservation } = this.state;
    const { año, mes, dia, slot, empleadoID } = userReservation;
    const { currentUser } = app.auth();

    app
      .database()
      .ref(`/usuarios/${currentUser.uid}/reservas/${reservaID}`)
      .update({ userReservation });

    app
      .database()
      .ref("reservas/")
      .child(`${reservaID}`)
      .update({
        userReservation: { ...userReservation, reservaID: reservaID }
      });

    slot.map(i => {
      app
        .database()
        .ref(
          `/empleados/${empleadoID}/reservaciones/${año}/${mes}/${dia}/slots/${i.slotID}`
        )
        .update({ isAvailable: i.isAvailable, isDisable: true });
    });

    this.props.navigation.navigate("Home");
  }

  setModalVisible(visible) {
    const { selectedSlots } = this.state;

    selectedSlots.forEach(i =>
      i.slotID === ""
        ? ToastAndroid.showWithGravity(
            "Seleccione la hora de su cita",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          )
        : this.setState({ modalVisible: visible })
    );
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
    const { selectedSlots } = this.state;
    const last = selectedSlots.length - 1;
    return (
      <View style={container}>
        <Text style={{ color: "white", marginHorizontal: 20 }}>
          La duracion de su cita es de: {this.state.duracion}. Seleccione a que
          hora desea comenzar su cita:
        </Text>

        <ScrollView contentContainerStyle={scrollContainer}>
          <View>
            {this.state.finalSlots.map((items, index) => {
              return (
                <Button
                  key={items.slot}
                  rounded
                  active={items.isAvailable}
                  style={
                    this.state.selectedSlotsArr.includes(items.slot) ||
                    !items.isAvailable
                      ? scrollBtnDisable
                      : scrollBtnStyle
                  }
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
                {this.state.userReservation.nEmpleado}{" "}
                {this.state.userReservation.aEmpleado} desde las:{" "}
                {this.state.selectedSlots[0] === undefined
                  ? ""
                  : this.state.selectedSlots[0].start}{" "}
                hasta las:{" "}
                {this.state.selectedSlots[last] === undefined
                  ? ""
                  : this.state.selectedSlots[last].end}
                , el dia {dia}/{mes}.
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
                  marginTop: 40
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

const duracionArr = [
  "0h 00m",
  "0h 30m",
  "1h 00m",
  "1h 30m",
  "2h 00m",
  "2h 30m",
  "3h 00m",
  "3h 30m",
  "4h 00m",
  "4h 30m",
  "5h 00m"
];

export default EditBookingSlots;
