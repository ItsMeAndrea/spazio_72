import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import _ from "lodash";
import { FlatList, View } from "react-native";
import { NavigationActions } from "react-navigation";

import ReservacionesItem from "../components/ReservacionesItem";

class VerReservacion extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      reservas: []
    };
  }
  static navigationOptions = {
    title: "Reservaciones",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  componentWillMount() {
    app
      .database()
      .ref("reservas/")
      .on("value", snapshot => {
        const reservas = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ reservas: reservas });
      });
  }

  getDayofWeek(index) {
    const { reservas } = this.state;
    const objeto = reservas[index];
    const fecha = new Date(
      objeto.userReservation.año,
      objeto.userReservation.mes - 1,
      objeto.userReservation.dia
    );
    const numeroDia = fecha.getDay();
    const nombreDias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ];

    return nombreDias[numeroDia];
  }

  getMonth(index) {
    const { reservas } = this.state;
    const objeto = reservas[index];
    const fecha = new Date(
      objeto.userReservation.año,
      objeto.userReservation.mes,
      objeto.userReservation.dia
    );
    const numeroMes = fecha.getMonth();
    const nombreMeses = [
      "Diciembre",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre"
    ];

    return nombreMeses[numeroMes];
  }

  onEdit = item => {
    const {
      usuarioID,
      slot,
      dia,
      mes,
      año,
      empleadoID,
      reservaID
    } = item.userReservation;
    const slotID = slot.map(i => i.slotID);

    slot.forEach((item, index) => {
      app
        .database()
        .ref(`usuarios/${usuarioID}/reservas/${reservaID}/userReservation/slot`)
        .child(`${index}`)
        .update({
          isDisable: false,
          isAvailable: true
        });
    });

    slotID.forEach(item => {
      app
        .database()
        .ref(`empleados/${empleadoID}/reservaciones/${año}/${mes}/${dia}/slots`)
        .child(`${item}`)
        .update({ isDisable: false, isAvailable: true });
    });

    this.props.navigation.navigate("EditarReserva", { item });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        <FlatList
          data={this.state.reservas}
          renderItem={({ item, index }) => (
            <ReservacionesItem
              reserva={item.userReservation}
              nombreDia={this.getDayofWeek(index)}
              mes={this.getMonth(index)}
              onEdit={this.onEdit}
              item={item}
            />
          )}
          keyExtractor={item => item.userReservation.reservaID}
        />
      </View>
    );
  }
}

export default VerReservacion;
