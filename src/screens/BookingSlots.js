import React, { Component } from "react";
import { View, Stylesheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class Bookingslots extends Component {
  render() {
    render(
      <View>
        <ScrollView></ScrollView>
      </View>
    );
  }
}

const slots = [
  { slot: "8:00 AM", isAvailable: true },
  { slot: "9:00 AM", isAvailable: true },
  { slot: "10:00 AM", isAvailable: true },
  { slot: "11:00 AM", isAvailable: true },
  { slot: "12:00 PM", isAvailable: true },
  { slot: "1:00 PM", isAvailable: true },
  { slot: "2:00 PM", isAvailable: true },
  { slot: "3:00 PM", isAvailable: true },
  { slot: "4:00 PM", isAvailable: true }
];
