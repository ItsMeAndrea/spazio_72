import _ from "lodash";
import React, { Component } from "react";
import app from "../firebase/firebaseConfig";

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Platform,
  Linking
} from "react-native";
import { Button } from "native-base";
import ListItem from "../components/ListItem";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      empleados: [],
      reservaciones: [
        {
          uid: "",
          userReservation: {
            slot: [{ slotID: "", slot: "", isAvailable: true }],
            servicios: [],
            dia: "",
            mes: "",
            año: "",
            nEmpleado: "",
            aEmpleado: "",
            empleadoID: "",
            aUsuario: "",
            nUsuario: "",
            eUsuario: "",
            usuarioID: ""
          }
        }
      ],
      reservacion: true
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Tus Reservaciones",
      headerStyle: {
        backgroundColor: "#282828"
      },
      headerTitleStyle: {
        color: "white",
        textAlign: "center",
        flex: 1
      },
      headerLeft: (
        <Button
          style={{ marginLeft: 10, marginTop: 5 }}
          transparent
          onPress={() => navigation.navigate("UserUpdate")}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../images/username.png")}
          />
        </Button>
      ),
      headerRight: (
        <Button
          style={{ marginRight: 10, marginTop: 5 }}
          transparent
          onPress={() => navigation.navigate("Gallery")}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../images/gallery.png")}
          />
        </Button>
      )
    };
  };

  componentDidMount() {
    if (Platform.OS === "android") {
      Linking.getInitialURL()
        .then(url => {
          url ? this.navigate(url) : this.props.navigation.navigate("Home");
        })
        .catch(this.props.navigation.navigate("Home"));
    } else {
      Linking.addEventListener("url", this.handleOpenURL);
    }
  }

  componentWillMount() {
    const { currentUser } = app.auth();
    app
      .database()
      .ref(`/usuarios/${currentUser.uid}/reservas`)
      .on("value", snapshot => {
        const reservas = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });
        this.setState({ reservaciones: reservas });
      });

    app
      .database()
      .ref("empleados/")
      .on("value", snapshot => {
        const empleados = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ empleados });
      });

    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = event => {
    // D
    this.navigate(event.url);
  };

  navigate = url => {
    const { empleados } = this.state;
    const empleadosID = empleados.map(i => i.empleadoID);
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, "");
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split("/")[0];
    const actionAlert = "El codigo no es valido";

    const isEmpleadoRegister = empleadosID.includes(id);

    isEmpleadoRegister
      ? routeName === "empleados" && navigate("Reservation", { id })
      : navigate("Home");
  };

  getDayofWeek(index) {
    const { reservaciones } = this.state;
    const objeto = reservaciones[index];
    const fecha = new Date(
      objeto.userReservation.año,
      objeto.userReservation.mes - 1,
      objeto.userReservation.dia
    );
    const numeroDia = fecha.getDay();
    const nombreDias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ];

    return nombreDias[numeroDia];
  }

  getMonth(index) {
    const { reservaciones } = this.state;
    const objeto = reservaciones[index];
    const fecha = new Date(
      objeto.userReservation.año,
      objeto.userReservation.mes,
      objeto.userReservation.dia
    );
    const numeroMes = fecha.getMonth();
    const nombreMeses = [
      "Diciembre",
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
      "Noviembre"
    ];

    return nombreMeses[numeroMes];
  }

  onEdit = item => {
    const { currentUser } = app.auth();
    const slots = item.userReservation.slot;
    const userReservation = item.userReservation;
    const { dia, mes, año, empleadoID } = userReservation;
    const reservaID = item.uid;
    const slotID = slots.map(i => i.slotID);

    slots.forEach((item, index) =>
      app
        .database()
        .ref(
          `usuarios/${currentUser.uid}/reservas/${reservaID}/userReservation/slot`
        )
        .child(`${index}`)
        .update({
          isDisable: false,
          isAvailable: true
        })
    );

    slotID.forEach((item, index) => {
      app
        .database()
        .ref(`empleados/${empleadoID}/reservaciones/${año}/${mes}/${dia}/slots`)
        .child(`${item}`)
        .update({ isDisable: false, isAvailable: true });
    });
    this.props.navigation.navigate("EditReservation", { item });
  };

  _camara = () => {
    this.props.navigation.navigate("Camara");
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        {this.state.reservaciones.length > 0 ? (
          <>
            <FlatList
              data={this.state.reservaciones}
              renderItem={({ item, index }) => (
                <ListItem
                  nombreDia={this.getDayofWeek(index)}
                  mes={this.getMonth(index)}
                  onEdit={this.onEdit}
                  item={item}
                />
              )}
              keyExtractor={item => item.uid}
            />

            <View style={styles.backButtonPosition}>
              <Button rounded style={styles.backButton} onPress={this._camara}>
                <Image
                  style={styles.backBtnStyle}
                  source={require("../images/camera.png")}
                />
              </Button>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                width: 250,
                height: 250,
                borderRadius: 250 / 2,
                backgroundColor: "#5e5e5e",
                alignSelf: "center",
                marginTop: 60,
                opacity: 0.7
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginHorizontal: 20,
                  marginTop: 90
                }}
              >
                Oprime el boton de la camara para escanear el codigo QR del
                empleado con el que deseas hacer tu cita.
              </Text>
            </View>

            <View style={styles.backButtonPosition}>
              <Button rounded style={styles.backButton} onPress={this._camara}>
                <Image
                  style={styles.backBtnStyle}
                  source={require("../images/camera.png")}
                />
              </Button>
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#D5C046",
    color: "white",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  textStyle: {
    fontSize: 20,
    color: "white"
  },
  backButtonPosition: {
    justifyContent: "flex-end",
    flex: 1,
    alignSelf: "center",
    marginBottom: -15
  },
  backButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    backgroundColor: "#D5C046"
  },
  backBtnStyle: {
    height: 40,
    width: 40
  }
});
