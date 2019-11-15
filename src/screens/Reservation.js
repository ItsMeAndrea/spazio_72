import React, { Component } from "react";
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { Button } from "native-base";
import Spinner from "../components/Spinner";

import app from "../firebase/firebaseConfig";
export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empleados: {},
      selected: ""
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount() {
    app
      .database()
      .ref(`/empleados`)
      .on("value", snapshot => {
        const empleados = snapshot.val();
        this.setState({ empleados: empleados });
      });
  }

  onDayPress(date) {
    const { id } = this.props.navigation.state.params;
    this.setState({
      selected: date.dateString,
      dia: date.day,
      mes: date.month,
      año: date.year
    });

    app
      .database()
      .ref(
        `/empleados/${id}/reservaciones/${date.year}/${date.month}/${date.day}`
      )
      .on("value", snapshot => {
        snapshot.val() === null
          ? this.setState({ slotsNull: true })
          : this.setState({ slotsNull: false });
      });
  }

  continueReservation(id) {
    const { dia, mes, año, empleados, slotsNull, selected } = this.state;
    const reservacion = {
      dia: dia,
      mes: mes,
      año: año,
      id: id,
      nEmpleado: empleados[id].nombre,
      aEmpleado: empleados[id].apellido
    };

    selected === ""
      ? ToastAndroid.showWithGravity(
          "Debe seleccionar un dia para hacer su cita",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      : slotsNull
      ? app
          .database()
          .ref(`/empleados/${id}/reservaciones/${año}/${mes}/${dia}`)
          .child("slots")
          .set(
            {
              0: {
                slot: "8:00 - 8:30 AM",
                isAvailable: true,
                start: "8:00 AM",
                end: "8:30 AM",
                isDisable: false,
                slotID: 0
              },
              1: {
                slot: "8:30 - 9:00 AM",
                isAvailable: true,
                start: "8:30 AM",
                end: "9:00 AM",
                isDisable: false,
                slotID: 1
              },
              2: {
                slot: "9:00 - 9:30 AM",
                isAvailable: true,
                start: "9:00 AM",
                end: "9:30 AM",
                isDisable: false,
                slotID: 2
              },
              3: {
                slot: "9:30 - 10:00 AM",
                isAvailable: true,
                start: "9:30 AM",
                end: "10:00 AM",
                isDisable: false,
                slotID: 3
              },
              4: {
                slot: "10:00 - 10:30 AM",
                isAvailable: true,
                start: "10:00 AM",
                end: "10:30 AM",
                isDisable: false,
                slotID: 4
              },
              5: {
                slot: "10:30 - 11:00 AM",
                isAvailable: true,
                start: "10:30 AM",
                end: "11:00 AM",
                isDisable: false,
                slotID: 5
              },
              6: {
                slot: "11:00 - 11:30 AM",
                isAvailable: true,
                start: "11:00 AM",
                end: "11:30 AM",
                isDisable: false,
                slotID: 6
              },
              7: {
                slot: "11:30 AM - 12:00 PM",
                isAvailable: true,
                start: "11:30 AM",
                end: "12:00 PM",
                isDisable: false,
                slotID: 7
              },
              8: {
                slot: "12:00 - 12:30 PM",
                isAvailable: true,
                start: "12:00 PM",
                end: "12:30 PM",
                isDisable: false,
                slotID: 8
              },
              9: {
                slot: "12:30 - 1:00 PM",
                isAvailable: true,
                start: "12:30 PM",
                end: "1:00 PM",
                isDisable: false,
                slotID: 9
              },
              10: {
                slot: "1:00 - 1:30 PM",
                isAvailable: true,
                start: "1:00 PM",
                end: "1:30 PM",
                isDisable: false,
                slotID: 10
              },
              11: {
                slot: "1:30 - 2:00 PM",
                isAvailable: true,
                start: "1:30 PM",
                end: "2:00 PM",
                isDisable: false,
                slotID: 11
              },
              12: {
                slot: "2:00 - 2:30 PM",
                isAvailable: true,
                start: "2:30 PM",
                end: "2:30 PM",
                isDisable: false,
                slotID: 12
              },
              13: {
                slot: "2:30 - 3:00 PM",
                isAvailable: true,
                start: "2:30 PM",
                end: "3:00 PM",
                isDisable: false,
                slotID: 13
              },
              14: {
                slot: "3:00 - 3:30 PM",
                isAvailable: true,
                start: "3:00 PM",
                end: "3:30 PM",
                isDisable: false,
                slotID: 14
              },
              15: {
                slot: "3:30 - 4:00 PM",
                isAvailable: true,
                start: "3:30 PM",
                end: "4:00 PM",
                isDisable: false,
                slotID: 15
              },
              16: {
                slot: "4:00 - 4:30 PM",
                isAvailable: true,
                start: "4:00 PM",
                end: "4:30 PM",
                isDisable: false,
                slotID: 16
              },
              17: {
                slot: "4:30 - 5:00 PM",
                isAvailable: true,
                start: "4:30 PM",
                end: "5:00 PM",
                isDisable: false,
                slotID: 17
              }
            },
            error => {
              error
                ? ToastAndroid.showWithGravity(
                    `${error.message}`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  )
                : this.props.navigation.navigate("UserSelectServicio", {
                    reservacion,
                    id
                  });
            }
          )
      : this.props.navigation.navigate("UserSelectServicio", {
          reservacion,
          id
        });
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

  render() {
    const { id } = this.props.navigation.state.params;
    const { empleados } = this.state;
    const { textStyle, btnStyle, container } = styles;
    if (!empleados[id])
      return (
        <View style={container}>
          <Spinner />
        </View>
      );
    return (
      <View style={container}>
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              textAlign: "center",
              marginTop: 10
            }}
          >
            Tu reservacion se hara con:
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            {`${empleados[id].nombre} ${empleados[id].apellido}`}
          </Text>
          <Calendar
            monthFormat={"MMM d, yyyy"}
            minDate={Date()}
            onDayPress={this.onDayPress}
            onDayLongPress={this.onDayPress}
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

        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => {
            this.continueReservation(id);
          }}
        >
          <Text style={textStyle}>SIGUIENTE</Text>
        </Button>
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
