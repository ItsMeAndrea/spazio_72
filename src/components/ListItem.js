import React from "react";
import app from "../firebase/firebaseConfig";
import { Text, Image } from "react-native";
import { Button } from "native-base";
import Swipeable from "react-native-swipeable";

const onDelete = (reservaID, empleadoID, item) => {
  const { currentUser } = app.auth();
  app
    .database()
    .ref(`usuarios/${currentUser.uid}/reservas/${reservaID}`)
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

const ListItem = ({ mes, nombreDia, onEdit, item }) => {
  const {
    dia,
    nEmpleado,
    aEmpleado,
    empleadoID,
    slot,
    servicios
  } = item.userReservation;
  const serviciosNombre = servicios.map(i => i.label);
  const rightButtons = [
    <Button
      style={{
        width: 400,
        height: 100,
        backgroundColor: "#279e29",
        padding: 40
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
        height: 100,
        backgroundColor: "#bc2121",
        padding: 40
      }}
      onPress={() => onDelete(item.uid, empleadoID, item)}
    >
      <Image
        style={{ width: 20, height: 20 }}
        source={require("../images/cancel.png")}
      />
    </Button>
  ];
  return (
    <Swipeable
      leftButtonWidth={100}
      rightButtonWidth={100}
      rightButtons={rightButtons}
      style={{
        height: 100,
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
        {nEmpleado} {aEmpleado}
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
          paddingLeft: 20
        }}
      >
        {slot[0].start} - {slot[slot.length - 1].end}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 12,
          paddingLeft: 20
        }}
      >
        {serviciosNombre.join(", ")}
      </Text>

      {/*   {servicios.map(servicio => {
        return (
          <Text
            style={{
              color: "white",
              fontSize: 12,
              paddingLeft: 20
            }}
          >
            {servicio.toString()}
          </Text>
        );
      })} */}
      {console.log(servicios, "servicios")}
    </Swipeable>
  );
};

export default ListItem;
