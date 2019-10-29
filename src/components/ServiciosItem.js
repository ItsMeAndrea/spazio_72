import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Button } from "native-base";
import Swipeable from "react-native-swipeable";

const ServiciosItem = ({ servicios }) => {
  const { swipeStyle, boldText, boldTextFist, textStyle } = styles;

  const rightButtons = [
    <Button
      style={{
        width: 400,
        height: 90,
        backgroundColor: "#279e29",
        padding: 35
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
        height: 90,
        backgroundColor: "#bc2121",
        padding: 35
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
      leftButtonWidth={90}
      rightButtonWidth={90}
      rightButtons={rightButtons}
      style={swipeStyle}
    >
      <Text style={textStyle}> {servicios.nombreServicio}</Text>
      <Text style={textStyle}> Duración: {servicios.duracion}</Text>
      <Text style={textStyle}> Precio: {servicios.precioServicio} $</Text>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipeStyle: {
    height: 90,
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
    fontSize: 15,
    color: "white",
    paddingLeft: 20,
    paddingTop: 5
  }
});

export default ServiciosItem;
