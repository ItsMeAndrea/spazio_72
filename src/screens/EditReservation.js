import _ from "lodash";
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { Button, Picker, Icon } from "native-base";

import app from "../firebase/firebaseConfig";
export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      slots: slots,
      empleados: undefined,
      isAvailable: true
    };
    this.onDayPress = this.onDayPress.bind(this);
    this.onScrollPress = this.onScrollPress.bind(this);
    this.hacerReservacion = this.hacerReservacion.bind(this);
  }

  static navigationOptions = {
    title: "Edita  tu Reservacion",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  componentWillMount() {
    const reserva = this.props.navigation.getParam("item");

    return this.setState({
      selected: `2019-${reserva.mes}-${reserva.dia}`,
      dia: reserva.dia,
      mes: reserva.mes,
      hora: reserva.hora
    });
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
    this.setState({ hora: items.slot });
  }

  hacerReservacion() {
    const { dia, mes, hora } = this.state;
    const { currentUser } = app.auth();
    this.props.navigation.navigate("Home");
    app
      .database()
      .ref(`/usuarios/${currentUser.uid}/reservas`)
      .push({ dia, mes, hora });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onValueChange(value) {
    this.setState({
      empleados: value
    });
  }

  onButtonPress() {
    const { dia, mes, hora } = this.state;
    console.log(dia, mes, hora);
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
          <Picker
            mode="dropdown"
            placeholder="Select your SIM"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Select your SIM"
            textStyle={{ color: "#5cb85c" }}
            itemStyle={{
              backgroundColor: "blue",
              marginLeft: 0,
              paddingLeft: 10
            }}
            itemTextStyle={{ color: "#788ad2" }}
            style={{ width: undefined }}
            selectedValue={this.state.empleados}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Mariella Duran" value="key0" />
            <Picker.Item label="Yolima Lugo" value="key1" />
            <Picker.Item label="Omar Tronconis" value="key2" />
            <Picker.Item label="Yuletzi Urbina" value="key3" />
            <Picker.Item label="Gerardo Galue" value="key4" />
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
            this.onButtonPress();
          }}
        >
          <Text style={textStyle}>GUARDAR</Text>
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
