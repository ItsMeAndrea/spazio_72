import _ from "lodash";
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { Button, Picker, Icon } from "native-base";

import app from "../firebase/firebaseConfig";
export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empleados: [{ nombre: "", apellido: "", uid: "" }],
      selectEmpleado: "",
      reservaID: ""
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentWillMount() {
    const reserva = this.props.navigation.getParam("item");
    const { userReservation, uid } = reserva;

    return this.setState({
      selected: `2019-${userReservation.mes}-${userReservation.dia}`,
      dia: userReservation.dia,
      mes: userReservation.mes,
      año: userReservation.año,
      selectEmpleado: userReservation.empleadoID,
      reservaID: uid
    });
  }

  componentDidMount() {
    app
      .database()
      .ref(`/empleados`)
      .on("value", snapshot => {
        const empleados = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });
        this.setState({ empleados: empleados });
      });
  }

  onDayPress(date) {
    /* const reserva = this.props.navigation.getParam("item");
    const { empleadoID } = reserva.userReservation; */
    const { selectEmpleado } = this.state;
    this.setState({
      selected: date.dateString,
      dia: date.day,
      mes: date.month
    });

    app
      .database()
      .ref(
        `/empleados/${selectEmpleado}/reservaciones/${date.year}/${date.month}/${date.day}`
      )
      .on("value", snapshot => {
        snapshot.val() === null
          ? this.setState({ slotsNull: true })
          : this.setState({ slotsNull: false });
      });
  }

  onValueChange(value) {
    this.setState({
      selectEmpleado: value,
      reserva: {}
    });
  }

  continueReservation(selectEmpleado) {
    const { dia, mes, año, empleados, slotsNull, reservaID } = this.state;
    const nombreEmpleado = empleados.find(value => value.uid === selectEmpleado)
      .nombre;
    const apellidoEmpleado = empleados.find(
      value => value.uid === selectEmpleado
    ).apellido;
    const reservacion = {
      dia: dia,
      mes: mes,
      año: año,
      id: selectEmpleado,
      nEmpleado: nombreEmpleado,
      aEmpleado: apellidoEmpleado,
      reservaID: reservaID
    };

    slotsNull
      ? app
          .database()
          .ref(
            `/empleados/${selectEmpleado}/reservaciones/${año}/${mes}/${dia}`
          )
          .child("slots")
          .set(
            {
              slot0: { slot: "8:00 AM", isAvailable: true },
              slot1: { slot: "9:00 AM", isAvailable: true },
              slot2: { slot: "10:00 AM", isAvailable: true },
              slot3: { slot: "11:00 AM", isAvailable: true },
              slot4: { slot: "12:00 PM", isAvailable: true },
              slot5: { slot: "1:00 PM", isAvailable: true },
              slot6: { slot: "2:00 PM", isAvailable: true },
              slot7: { slot: "3:00 PM", isAvailable: true },
              slot8: { slot: "4:00 PM", isAvailable: true }
            },
            error => {
              error
                ? console.log("error base de datos")
                : this.props.navigation.navigate("EditBooking", {
                    reservacion
                  });
            }
          )
      : this.props.navigation.navigate("EditBooking", { reservacion });
  }

  static navigationOptions = {
    title: "Edita  tu reservacion",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  render() {
    /* const reserva = this.props.navigation.getParam("item");
    const { empleadoID } = reserva.userReservation; */
    const { selectEmpleado } = this.state;
    const { textStyle, btnStyle, container } = styles;

    return (
      <View style={container}>
        <View>
          <Picker
            mode="dropdown"
            placeholder="Selecciona un empleado"
            iosIcon={<Icon name="arrow-down" />}
            textStyle={{ color: "#5cb85c" }}
            itemStyle={{
              backgroundColor: "blue",
              marginLeft: 0,
              paddingLeft: 10
            }}
            itemTextStyle={{ color: "#788ad2" }}
            style={{ width: undefined }}
            selectedValue={this.state.selectEmpleado}
            onValueChange={this.onValueChange.bind(this)}
          >
            {this.state.empleados.map(empleado => {
              return (
                <Picker.Item
                  label={`${empleado.nombre}` + ` ` + `${empleado.apellido}`}
                  value={empleado.uid}
                  key={empleado.uid}
                />
              );
            })}
          </Picker>
        </View>
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
            style={{ marginBottom: 10 }}
          />
        </View>

        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => {
            this.continueReservation(selectEmpleado);
          }}
        >
          <Text style={textStyle}>CONTINUAR</Text>
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
  },
  scrollContainer: {
    height: 45,
    marginBottom: 10
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
