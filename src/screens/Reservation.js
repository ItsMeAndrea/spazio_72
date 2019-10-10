import React, { Component } from "react";
import { View, StyleSheet, Text, Modal, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { Button } from "native-base";

import app from "../firebase/firebaseConfig";
export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      slots: slots,
      newReservation: {}
    };
    this.onDayPress = this.onDayPress.bind(this);
    this.onScrollPress = this.onScrollPress.bind(this);
    this.hacerReservacion = this.hacerReservacion.bind(this);
  }

  onDayPress(date) {
    this.setState({
      selected: date.dateString,
      dia: date.day,
      mes: date.month
    });
  }

  onScrollPress(items) {
    const available = () => {
      return items.isAvailable ? false : true;
    };
    items.isAvailable = available();
    this.setState({
      newReservation: { slot: items.slot, isAvailable: items.isAvailable }
    });
  }

  hacerReservacion() {
    const { dia, mes, newReservation } = this.state;
    const { currentUser } = app.auth();
    this.props.navigation.navigate("Home");
    app
      .database()
      .ref(`/usuarios/${currentUser.uid}/reservas`)
      .push({ dia, mes, newReservation });
  }

  empleado() {
    app
      .database()
      .ref(`/empleados/`)
      .push({ nombre: "Gerardo", apellido: "Galue" });
  }

  static navigationOptions = {
    title: "Reservación",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {
      textStyle,
      btnStyle,
      container,
      scrollBtnStyle,
      scrollContainer,
      scrollTextStyle,
      scrollBtnDisable
    } = styles;
    return (
      <View style={container}>
        <View>
          <Calendar
            monthFormat={"MMM d, yyyy"}
            minDate={Date()}
            onDayPress={this.onDayPress}
            markedDates={{ [this.state.selected]: { selected: true } }}
            theme={{
              backgroundColor: "#282828",
              calendarBackground: "#282828",
              selectedDayBackgroundColor: "#D5C046",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#D5C046",
              monthTextColor: "white",
              indicatorColor: "white",
              arrowColor: "#D5C046",
              dayTextColor: "white",
              textDisabledColor: "#2d4150"
            }}
            style={{ marginBottom: 30 }}
          />
        </View>

        <View style={scrollContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.state.slots.map(items => {
              return (
                <Button
                  key={items.slot}
                  rounded
                  active={items.isAvailable}
                  style={items.isAvailable ? scrollBtnStyle : scrollBtnDisable}
                  onPress={() => this.onScrollPress(items)}
                >
                  <Text style={scrollTextStyle}>{items.slot}</Text>
                </Button>
              );
            })}
          </ScrollView>
        </View>

        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <Text style={textStyle}>ACEPTAR</Text>
        </Button>

        {/* MODAL */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "#00000070",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 350,
                height: 220,
                backgroundColor: "#282828",
                padding: 30,
                borderRadius: 20
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center"
                }}
              >
                ¿Confirma que desea realizar su reservacion el dia{" "}
                {this.state.dia}/{this.state.mes} a las {this.state.hora} con
                Mariella Duran?
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 40
                }}
              >
                <Button
                  rounded
                  style={{
                    backgroundColor: "#D5C046",
                    color: "white",
                    padding: 20,
                    width: 120,
                    justifyContent: "center"
                  }}
                  onPress={() => this.hacerReservacion()}
                >
                  <Text style={textStyle}>Aceptar</Text>
                </Button>

                <Button
                  rounded
                  style={{
                    backgroundColor: "#D5C046",
                    color: "white",
                    padding: 20,
                    width: 120,
                    justifyContent: "center"
                  }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={textStyle}>Cancelar</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828"
  },
  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    marginHorizontal: 30,
    marginBottom: 40
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  },
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
  },
  scrollBtnDisable: {
    backgroundColor: "gray",
    paddingHorizontal: 30,
    marginHorizontal: 5,
    height: 40
  }
});

LocaleConfig.locales["sp"] = {
  monthNames: [
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
    "Noviembre",
    "Diciembre"
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic."
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
  today: "Hoy"
};
LocaleConfig.defaultLocale = "sp";

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
