import React from "react";
import { View, CheckBox, Text } from "react-native";

const SeleccionarServicios = ({ servicio, handleCheck, checked = false }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <CheckBox value={checked} onValueChange={handleCheck} />
      <Text style={{ color: "white" }}>{servicio.nombreServicio}</Text>
    </View>
  );
};

export default SeleccionarServicios;
