import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import _ from "lodash";
import { Image, Text } from "react-native";
import { View, FlatList, Button } from "native-base";
import Swipeable from "react-native-swipeable";

const rightButtons = [
  <Button
    style={{
      width: 400,
      height: 110,
      backgroundColor: "#279e29",
      padding: 45
    }}
    onPress={() => onEdit(item)}
  >
    <Image
      style={{ width: 20, height: 20 }}
      source={require("../images/edit.png")}
    />
  </Button>,
  <Button
    style={{
      width: 400,
      height: 110,
      backgroundColor: "#bc2121",
      padding: 45
    }}
    onPress={() => onDelete(reservaID, empleadoID, item, slotID)}
  >
    <Image
      style={{ width: 20, height: 20 }}
      source={require("../images/cancel.png")}
    />
  </Button>
];

class VerReservacion extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      usuarios: [
        {
          datos: {
            apellido: "",
            nombre: "",
            email: "",
            isAdmin: false
          },
          reservas: {
            userReservation: {
              slotID: "",
              dia: "",
              mes: "",
              año: "",
              isAvailable: true,
              slot: "",
              nEmpleado: "",
              aEmpleado: "",
              empleadoID: ""
            }
          }
        }
      ]
    };
  }
  static navigationOptions = {
    title: "Reservaciones",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  componentWillMount() {
    app
      .database()
      .ref("usuarios/")
      .on("value", snapshot => {
        const usuarios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ usuarios: usuarios });
        console.log(this.state.usuarios);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        {/*    <FlatList
          data={this.state.usuarios}
          renderItems={({ item, index }) => (
            <Swipeable
              leftButtonWidth={80}
              rightButtonWidth={80}
              rightButtons={rightButtons}
              style={{
                height: 80,
                backgroundColor: "gray",
                borderBottomWidth: 1,
                borderBottomColor: "black"
              }}
            ></Swipeable>
          )}
        ></FlatList> */}
        <Swipeable
          leftButtonWidth={110}
          rightButtonWidth={110}
          rightButtons={rightButtons}
          style={{
            height: 110,
            backgroundColor: "gray",
            borderBottomWidth: 1,
            borderBottomColor: "black"
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              paddingLeft: 20,
              paddingTop: 10
            }}
          >
            Usuario: itsandrea_94@hotmail.com
          </Text>
          <Text style={{ fontSize: 8, marginLeft: 85 }}>
            {"(Andrea Urdaneta)"}
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              paddingLeft: 20
            }}
          >
            Empleado: Yolimar Lugo
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              paddingLeft: 20
            }}
          >
            Fecha: Lunes, 25 de Octubre
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              paddingLeft: 20
            }}
          >
            Hora: 9:00 AM - 11:00 AM
          </Text>
        </Swipeable>
      </View>
    );
  }
}

export default VerReservacion;
