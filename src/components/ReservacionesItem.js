import React from "react";
import app from "../firebase/firebaseConfig";
import { Text, Image, StyleSheet } from "react-native";
import { Button } from "native-base";
import Swipeable from "react-native-swipeable";

const onDelete = (reservaID, empleadoID, item, usuarioID) => {
  app
    .database()
    .ref(`usuarios/${usuarioID}/reservas/${reservaID}`)
    .remove();

  item.userReservation.slot.map(i =>
    app
      .database()
      .ref(
        `/empleados/${empleadoID}/reservaciones/${item.userReservation.año}/${item.userReservation.mes}/${item.userReservation.dia}/slots`
      )
      .child(`${i.slotID}`)
      .update({ isAvailable: true, isDisable: false })
  );

  app
    .database()
    .ref(`reservas/${reservaID}`)
    .remove();
};

const ReservacionesItem = ({ reserva, nombreDia, mes, onEdit, item }) => {
  const {
    nEmpleado,
    aEmpleado,
    nUsuario,
    aUsuario,
    eUsuario,
    dia,
    año,
    slot,
    usuarioID,
    reservaID,
    empleadoID,
    servicios
  } = reserva;
  const serviciosNombre = servicios.map(i => i.label);
  const { swipeStyle, boldText, boldTextFist, textStyle } = styles;
  const rightButtons = [
    <Button
      style={{
        width: 400,
        height: 130,
        backgroundColor: "#279e29",
        padding: 60
      }}
      onPress={() => onEdit(item)}
    >
      <Image
        style={{ width: 20, height: 20 }}
        source={require("../images/edit.png")}
      />
    </Button>,
    <Button
      style={{
        width: 400,
        height: 130,
        backgroundColor: "#bc2121",
        padding: 60
      }}
      onPress={() => onDelete(reservaID, empleadoID, item, usuarioID)}
    >
      <Image
        style={{ width: 20, height: 20 }}
        source={require("../images/cancel.png")}
      />
    </Button>
  ];
  return (
    <Swipeable
      leftButtonWidth={130}
      rightButtonWidth={130}
      rightButtons={rightButtons}
      style={swipeStyle}
    >
      <Text style={boldTextFist}>{`${nUsuario} ${aUsuario}`} </Text>
      <Text style={textStyle}>{`${eUsuario}`}</Text>
      <Text style={boldText}>{`${nEmpleado} ${aEmpleado}`} </Text>
      <Text style={textStyle}>{`${nombreDia}, ${dia} de ${mes}, ${año}`}</Text>
      <Text style={textStyle}>
        {slot[0].start} - {slot[slot.length - 1].end}
      </Text>
      <Text style={textStyle}>{serviciosNombre.join(", ")}</Text>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipeStyle: {
    height: 130,
    backgroundColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  boldTextFist: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 20,
    paddingTop: 10
  },
  boldText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 20
  },
  textStyle: {
    fontSize: 10,
    color: "white",
    paddingLeft: 20
  }
});

export default ReservacionesItem;
