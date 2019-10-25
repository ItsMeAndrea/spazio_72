import React from "react";
import app from "../firebase/firebaseConfig";
import { Text, Image, StyleSheet } from "react-native";
import { Button } from "native-base";
import Swipeable from "react-native-swipeable";

const onDelete = (reservaID, empleadoID, item, slotID) => {
  const { currentUser } = app.auth();
  app
    .database()
    .ref(`usuarios/${currentUser.uid}/reservas/${reservaID}`)
    .remove();

  app
    .database()
    .ref(
      `/empleados/${empleadoID}/reservaciones/${item.userReservation.año}/${item.userReservation.mes}/${item.userReservation.dia}/slots`
    )
    .child(`${slotID}`)
    .update({ isAvailable: true });
};

const ReservacionesItem = ({ reserva, nombreDia, mes }) => {
  const {
    nEmpleado,
    aEmpleado,
    nUsario,
    aUsuario,
    eUsuario,
    dia,
    año,
    slot
  } = reserva;

  const { swipeStyle, boldText, boldTextFist, textStyle } = styles;
  const rightButtons = [
    <Button
      style={{
        width: 400,
        height: 120,
        backgroundColor: "#279e29",
        padding: 50
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
        height: 120,
        backgroundColor: "#bc2121",
        padding: 50
      }}
      onPress={() => onDelete(reservaID, empleadoID, item, slotID)}
    >
      <Image
        style={{ width: 20, height: 20 }}
        source={require("../images/cancel.png")}
      />
    </Button>
  ];
  return (
    <Swipeable
      leftButtonWidth={120}
      rightButtonWidth={120}
      rightButtons={rightButtons}
      style={swipeStyle}
    >
      <Text style={boldTextFist}>{`${nUsario} ${aUsuario}`} </Text>
      <Text style={textStyle}>{`${eUsuario}`}</Text>
      <Text style={boldText}>{`${nEmpleado} ${aEmpleado}`} </Text>
      <Text style={textStyle}>{`${nombreDia}, ${dia} de ${mes}, ${año}`}</Text>
      <Text style={textStyle}>{`${slot}`}</Text>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipeStyle: {
    height: 120,
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
