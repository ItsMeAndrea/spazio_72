import React from "react";
import app from "../firebase/firebaseConfig";
import { Text, Image, StyleSheet } from "react-native";
import { Button, View } from "native-base";
import Swipeable from "react-native-swipeable";

const UsuarioItem = ({ usuario, onEdit }) => {
  const { nombre, apellido, email } = usuario;
  const { swipeStyle, boldTextFist, textStyle } = styles;
  const rightButtons = [
    <Button
      style={{
        width: 400,
        height: 60,
        backgroundColor: "#279e29",
        padding: 20
      }}
      onPress={() => onEdit(usuario)}
    >
      <Image
        style={{ width: 20, height: 20 }}
        source={require("../images/edit.png")}
      />
    </Button>,
    <Button
      style={{
        width: 400,
        height: 60,
        backgroundColor: "#bc2121",
        padding: 20
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
    <View style={{ borderBottomColor: "white", borderBottomWidth: 1 }}>
      <Text style={boldTextFist}>{`${nombre} ${apellido}`}</Text>
      <Text style={textStyle}>{`${email}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingLeft: 20,
    paddingBottom: 10
  }
});

export default UsuarioItem;
