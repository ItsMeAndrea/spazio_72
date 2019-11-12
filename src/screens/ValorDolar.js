import React, { Component } from "react";
import { View, Image, Text, StyleSheet, ToastAndroid } from "react-native";
import { Form, Input, Item, Button } from "native-base";
import app from "../firebase/firebaseConfig";
import _ from "lodash";

class ValorDolar extends Component {
  static navigationOptions = {
    title: "Cambio del Dia",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      cambio: "",
      cambioUpdate: "",
      servicios: []
    };
  }

  componentWillMount() {
    app
      .database()
      .ref("tasaDolar")
      .on("value", snapshot => {
        const cambio = snapshot.val();
        this.setState({ cambioUpdate: cambio.tasa });
      });

    app
      .database()
      .ref("servicios/")
      .on("value", snapshot => {
        const servicios = _.map(snapshot.val(), val => {
          return { ...val };
        });
        this.setState({ servicios });
      });
  }

  onChangeText(cambio) {
    this.setState({ cambio });
  }

  onButtonPress() {
    const { cambio, servicios } = this.state;
    const cambioNum = Number(cambio);
    const test = cambio.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const precioServiciosBS = servicios.map(i => {
      return i.precioServicio * cambioNum;
    });

    cambio === ""
      ? ToastAndroid.showWithGravity(
          "Debe ingresar un valor",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      : (app
          .database()
          .ref("tasaDolar")
          .set({ tasa: test }),
        servicios.forEach((item, index) => {
          app
            .database()
            .ref("servicios/")
            .child(`${item.servicioID}`)
            .update({ precioBs: precioServiciosBS[index] });
        }),
        this.setState({ cambioUpdate: test }));
  }

  render() {
    const {
      container,
      itemStyle,
      textStyle,
      inputStyle,
      btnStyle,
      btnTextStyle
    } = styles;
    return (
      <View style={container}>
        <Text style={{ color: "white", marginTop: 20, marginLeft: 20 }}>
          Valor Anterior:
        </Text>
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontSize: 35,
            marginBottom: 40,
            marginTop: 20
          }}
        >
          BsS. {this.state.cambioUpdate}
        </Text>
        <Text style={textStyle}>Ingrese el valor del dolar.</Text>
        <Item rounded style={itemStyle}>
          <Input
            autoCorrect={false}
            style={inputStyle}
            placeholder="Cambio del dia"
            placeholderTextColor="white"
            value={this.state.cambio}
            onChangeText={cambio => this.onChangeText(cambio)}
            keyboardType={"number-pad"}
          />
          <Text style={{ marginRight: 20 }}>Bs.</Text>
        </Item>
        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => this.onButtonPress()}
        >
          <Text style={btnTextStyle}>Guardar</Text>
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
    marginHorizontal: 30
  },
  textStyle: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20
  },
  btnTextStyle: {
    fontSize: 15,
    color: "white"
  },
  itemStyle: {
    backgroundColor: "gray",
    opacity: 0.8,
    marginRight: 30,
    marginLeft: 30,
    height: 50,
    marginBottom: 10,
    color: "white"
  },
  inputStyle: {
    color: "white",
    fontSize: 20,
    marginLeft: 20
  }
});

export default ValorDolar;
