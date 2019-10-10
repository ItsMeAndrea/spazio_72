import _ from "lodash";
import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Button } from "native-base";
import ListItem from "../components/ListItem";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      reservaciones: [{ dia: "", mes: "" }],
      reservacion: true
    };
  }
  static navigationOptions = {
    title: "Reservaciones",
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
        onPress={() => app.auth().signOut()}
      >
        <Image source={require("../images/logout.png")} />
      </Button>
    ),
    headerRight: (
      <Button style={{ marginRight: 10, marginTop: 5 }} transparent>
        <Image source={require("../images/more.png")} />
      </Button>
    )
  };

  componentWillMount() {
    app
      .database()
      .ref(`/usuarios`)
      .on("value", snapshot => {
        const reservas = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });
        console.log(reservas.map(foo => foo.reservas, reservas.keys()));
        this.setState({ reservaciones: reservas.map(foo => foo.reservas) });
      });
  }

  getDayofWeek(index) {
    const { reservaciones } = this.state;
    const objeto = reservaciones[index];
    const fecha = new Date(2019, objeto.mes, objeto.dia);
    const numeroDia = fecha.getDay();
    const nombreDias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

    return nombreDias[numeroDia];
  }

  getMonth(index) {
    const { reservaciones } = this.state;
    const objeto = reservaciones[index];
    const fecha = new Date(2019, objeto.mes, objeto.dia);
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
    this.props.navigation.navigate("EditReservation", { item });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        {this.state.reservacion ? (
          <>
            <FlatList
              data={this.state.reservaciones}
              renderItem={({ item, index }) => (
                <ListItem
                  hora={item.hora}
                  nombreDia={this.getDayofWeek(index)}
                  dia={item.dia}
                  mes={this.getMonth(index)}
                  reservaID={item.uid}
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
          <Text>No Hay reservaciones</Text>
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
