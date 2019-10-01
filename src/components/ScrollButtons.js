import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "native-base";

const ScrollButtons = ({ slots, onClick, value }) => {
  const { btnStyle, textStyle, container } = styles;

  return (
    
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: 60,
    marginBottom: 20
  },
  scrollBtnStyle: {
    backgroundColor: "#D5C046",
    paddingHorizontal: 30,
    marginHorizontal: 5,
    height: 40
  },
  scrollTextStyle: {
    color: "white",
    fontSize: 16
  }
});

export default ScrollButtons;
