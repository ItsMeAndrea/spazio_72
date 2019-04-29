import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Form, Item, Input, Button } from 'native-base';

export default class App extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const {
      container,
      itemStyle,
      imageStyle,
      inputStyle,
      btnStyle,
      textStyle,
      paragraphStyle
    } = styles;
    return (
      <View style={container}>
        <View style={paragraphStyle}>
          <Text style={textStyle}>
            Ingrese su Correo Electronico y le enviaremos los pasos a seguir
            para recuperar su Contraseña.
          </Text>
        </View>

        <Form>
          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require('../images/username.png')}
            />
            <Input
              autoCorrect={false}
              style={inputStyle}
              placeholder="Ingrese Correo Electronico"
              placeholderTextColor="white"
            />
          </Item>
        </Form>

        <View>
          <Button block rounded style={btnStyle}>
            <Text style={textStyle}>ENVIAR</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#282828',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paragraphStyle: {
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  itemStyle: {
    backgroundColor: 'gray',
    opacity: 0.8,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    color: 'white'
  },
  imageStyle: {
    height: 30,
    width: 30,
    marginLeft: 10
  },
  inputStyle: {
    color: 'white'
  },
  btnStyle: {
    backgroundColor: '#D5C046',
    color: 'white',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30
  },
  textStyle: {
    fontSize: 20,
    color: 'white'
  }
};
