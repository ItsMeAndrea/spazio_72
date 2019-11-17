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

class AdminEditBookingSlots extends Component {
  //Configuracion para el Encabezado de la vista
  static navigationOptions = {
    title: "Edita tu reservación",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  //Metodo para inicializar los estados de la vista
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

  //Metodo que se activa de renderizar la vista
  componentWillMount() {
    //Declaracion de variables
    const reservacion = this.props.navigation.getParam("reservacion");
    const { dia, mes, año, id, usuarioID } = reservacion;
    const durationSum = this.props.navigation.getParam("durationSum");
    const duracion = duracionArr[durationSum];

    //Estableciendo el estado inicial de duracion
    this.setState({ duracion: duracion });

    //Busqueda a la base de datos. Se establece el estado inicial de slots
    app
      .database()
      .ref(`/empleados/${id}/reservaciones/${año}/${mes}/${dia}/slots`)
      .on("value", snapshot => {
        const slots = _.map(snapshot.val(), val => {
          return { ...val };
        });

        this.setState({ slots: slots });
      });

    //Busqueda a la base de datos. Se establece el estado inicial de userInfo
    app
      .database()
      .ref(`/usuarios/${usuarioID}/datos`)
      .on("value", snapshot => {
        const userInfo = snapshot.val();
        this.setState({ userInfo: userInfo });
      });

    //Busqueda a la base de datos. Se establece el estado inicial de slotsUsuario
    app
      .database()
      .ref(`usuarios/${usuarioID}/reservas`)
      .on("value", snapshot => {
        const slotsUsuario = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ slotsUsuario });
      });
  }

  //Metodo que se activa inmediatamente que la vista se monta
  componentDidMount() {
    //Se trae el valor del estado
    const { slots, slotsUsuario } = this.state;

    //Se establece un array de objectos que contiene las reservaciones realizadas por el usuario
    const slotsUsuarioNoDiponibles = slotsUsuario
      .map(i => {
        return i.userReservation.slot;
      })
      .flat();

    //Se une el array de slots con slotsUsuarioNoDisponibles para tener la lista definitiva de horas disponibles
    const result = slots
      .filter(a => !slotsUsuarioNoDiponibles.some(s => s.slotID == a.slotID))
      .concat(slotsUsuarioNoDiponibles);

    result.sort((a, b) => {
      return a.slotID - b.slotID;
    });

    //Se establece el estado de slotsUsuario
    this.setState({ finalSlots: result });
  }

  //Operaciones que ocurren cuando se oprime un boton. Se espera que al oprimir un boton se seleccionen inmediatamente la duracion total de la reserva. No se permite que se seleccionen horas ya reservadas, tanto por el empleado como por el usuario.
  onScrollPress(index) {
    //Declaracion de variables
    const reservacion = this.props.navigation.getParam("reservacion");
    const { usuarioID } = reservacion;
    const durationSum = this.props.navigation.getParam("durationSum");
    const selectedServicios = this.props.navigation.getParam(
      "selectedServicios"
    );
    const { dia, mes, año, nEmpleado, aEmpleado, id } = reservacion;
    const { nombre, apellido, email } = this.state.userInfo;
    const slotID = index;
    const endArr = index + durationSum;

    //Array de horas seleccionadas
    const selectedSlots = this.state.finalSlots.slice(index, endArr);
    //Array con los ID  de las horas seleccionadas
    const slotKey = selectedSlots.map(i => i.slotID);
    //Array temporal del estado anterior de las horas seleccionadas
    const tmp = this.state.selectedSlots.map(i => i.slotID);
    const slotArray = this.state.finalSlots
      .slice(index, endArr)
      .map(i => i.slot);

    //Cambia el estado de los botones oprimidos a No disponible y visceversa. Devuelve un array.
    const isAvailableArr = selectedSlots.map(i => {
      return i.isAvailable ? false : true;
    });

    //Retorna un booleano. Si todos los componentes del array isAvailableArr son verdaderos, retorna true.
    const isAvailable = isAvailableArr.every(i => i === true);

    //Se recorre el Array slotKey y se evalua si la hora esta incluida en el array tmp. Si esta incluida se limpia los estados selectedSlots y selectedslotsArr, de no estarlo se agregan las horas a los estados.
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

    //Declaracion de objeto slot
    const slot = selectedSlots.map((i, index) => {
      return {
        slotID: index + slotID,
        slot: i.slot,
        isAvailable: isAvailable,
        start: i.start,
        end: i.end
      };
    });

    //Se define el estado final de la reservacion
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

  //Operaciones necesarias para realizar la reservacion
  hacerReservacion() {
    //Declaracion de variables
    const reservacion = this.props.navigation.getParam("reservacion");
    const { reservaID } = reservacion;
    const { userReservation } = this.state;
    const { año, mes, dia, slot, empleadoID } = userReservation;
    const { currentUser } = app.auth();

    //Actualizar reservacion para el usuario
    app
      .database()
      .ref(`/usuarios/${currentUser.uid}/reservas/${reservaID}`)
      .update({ userReservation });

    //Actualizar reservacion
    app
      .database()
      .ref("reservas/")
      .child(`${reservaID}`)
      .update({
        userReservation: { ...userReservation, reservaID: reservaID }
      });

    //actualizar las horas disponibles de los empleados
    slot.map(i => {
      app
        .database()
        .ref(
          `/empleados/${empleadoID}/reservaciones/${año}/${mes}/${dia}/slots/${i.slotID}`
        )
        .update({ isAvailable: i.isAvailable, isDisable: true });
    });

    //Volver a la pantanlla de Ver Reservaciones
    this.props.navigation.navigate("VerReservaciones");
  }

  //Metodo que permite abrir y cerrar el modal
  setModalVisible(visible) {
    const { selectedSlots } = this.state;

    //Se verifica que el usuario haya seleccionado una hora
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
      textStyle,
      modalView,
      modalTextView,
      textStyleCenter,
      modalButtonsView,
      modalButton
    } = styles;
    const reservacion = this.props.navigation.getParam("reservacion");
    const { dia, mes } = reservacion;
    const { selectedSlots } = this.state;
    const last = selectedSlots.length - 1;
    return (
      <View style={container}>
        <Text style={textStyle}>
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
                  onPress={() => this.onScrollPress(index)}
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
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={modalView}>
            <View style={modalTextView}>
              <Text style={textStyleCenter}>
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

              <Text style={textStyleCenter}>¿Desea continuar?</Text>

              <View style={modalButtonsView}>
                <Button
                  rounded
                  style={modalButton}
                  onPress={() => this.hacerReservacion()}
                >
                  <Text style={textStyle}>Aceptar</Text>
                </Button>

                <Button
                  rounded
                  style={modalButton}
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
  },
  modalView: {
    backgroundColor: "#00000070",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  modalTextView: {
    width: 350,
    height: 220,
    backgroundColor: "#282828",
    padding: 30,
    borderRadius: 20
  },
  textStyleCenter: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
  },
  modalButtonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40
  },
  modalButton: {
    backgroundColor: "#D5C046",
    color: "white",
    padding: 20,
    width: 120,
    justifyContent: "center"
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

export default AdminEditBookingSlots;
