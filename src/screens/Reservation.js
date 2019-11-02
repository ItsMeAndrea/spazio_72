import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
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
    const { dia, mes, año, empleados, slotsNull } = this.state;
    const reservacion = {
      dia: dia,
      mes: mes,
      año: año,
      id: id,
      nEmpleado: empleados[id].nombre,
      aEmpleado: empleados[id].apellido
    };

    slotsNull
      ? app
          .database()
          .ref(`/empleados/${id}/reservaciones/${año}/${mes}/${dia}`)
          .child("slots")
          .set(
            {
              0: { slot: "8:00 - 8:30 AM", isAvailable: true },
              1: { slot: "8:30 - 9:00 AM", isAvailable: true },
              2: { slot: "9:00 - 9:30 AM", isAvailable: true },
              3: { slot: "9:30 - 10:00 AM", isAvailable: true },
              4: { slot: "10:00 - 10:30 AM", isAvailable: true },
              5: { slot: "10:30 - 11:00 AM", isAvailable: true },
              6: { slot: "11:00 - 11:30 AM", isAvailable: true },
              7: { slot: "11:30 AM - 12:00 PM", isAvailable: true },
              8: { slot: "12:00 - 12:30 PM", isAvailable: true },
              9: { slot: "12:30 - 1:00 PM", isAvailable: true },
              10: { slot: "1:00 - 1:30 PM", isAvailable: true },
              11: { slot: "1:30 - 2:00 PM", isAvailable: true },
              12: { slot: "2:00 - 2:30 PM", isAvailable: true },
              13: { slot: "2:30 - 3:00 PM", isAvailable: true },
              14: { slot: "3:00 - 3:30 PM", isAvailable: true },
              15: { slot: "3:30 - 4:00 PM", isAvailable: true },
              16: { slot: "4:00 - 4:30 PM", isAvailable: true },
              17: { slot: "4:30 - 5:00 PM", isAvailable: true }
            },
            error => {
              error
                ? console.log("error base de datos")
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
