import React from "react";
import app from "../firebase/firebaseConfig";
import { Text, Image } from "react-native";
import { Button } from "native-base";
import Swipeable from "react-native-swipeable";

/* const onDelete = (reservaID, empleadoID, item, slotID) => {
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
}; */

const ListItem = ({
  dia,
  mes,
  nombreDia,
  reservaID,
  onEdit,
  item,
  nombreEmpleado,
  apellidoEmpleado,
  empleadoID
}) => {
  const rightButtons = [
    <Button
      style={{
        width: 400,
        height: 80,
        backgroundColor: "#279e29",
        padding: 30
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
        height: 80,
        backgroundColor: "#bc2121",
        padding: 30
      }}
      onPress={() => onDelete(reservaID, empleadoID, item)}
    >
      <Image
        style={{ width: 20, height: 20 }}
        source={require("../images/cancel.png")}
      />
    </Button>
  ];
  return (
    <Swipeable
      leftButtonWidth={80}
      rightButtonWidth={80}
      rightButtons={rightButtons}
      style={{
        height: 80,
        backgroundColor: "gray",
        borderBottomWidth: 1,
        borderBottomColor: "black"
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 15,
          paddingLeft: 20,
          paddingTop: 10
        }}
      >
        {nombreEmpleado} {apellidoEmpleado}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 12,
          paddingLeft: 20
        }}
      >
        {nombreDia}, {dia} de {mes}.
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 12,
          paddingLeft: 20,

          paddingBottom: 10
        }}
      ></Text>
    </Swipeable>
  );
};

export default ListItem;
