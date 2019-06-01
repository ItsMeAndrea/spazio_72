import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Form, Item, Input, Button } from 'native-base';

export default class App extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const {
      container,
      logoStyle,
      itemStyle,
      imageStyle,
      inputStyle,
      btnStyle,
      textStyle,
      signupStyle
    } = styles;
    return (
      <View style={container}>
        <View style={{ alignItems: 'center' }}>
          <Image style={logoStyle} source={require('../images/logo.png')} />
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
              placeholder="Correo"
              placeholderTextColor="white"
            />
          </Item>
          <Item rounded style={itemStyle}>
            <Image
              style={imageStyle}
              source={require('../images/password.png')}
            />
            <Input
              autoCorrect={false}
              secureTextEntry
              style={inputStyle}
              placeholder="Contraseña"
              placeholderTextColor="white"
            />
            <Image
              style={imageStyle}
              source={require('../images/eye_black.png')}
            />
          </Item>
        </Form>

        <View style={signupStyle}>
          <Button transparent onPress={this._signUp}>
            <Text style={{ color: 'white' }}>Registrarse</Text>
          </Button>
          <Button
            style={{ paddingTop: 0 }}
            transparent
            onPress={this._forgotPassword}
          >
            <Text style={{ color: 'white' }}>Recuperar Contraseña</Text>
          </Button>
        </View>

        <View>
          <Button block rounded style={btnStyle} onPress={this._login}>
            <Text style={textStyle}>INGRESAR</Text>
          </Button>
        </View>
      </View>
    );
  }

  _login = () => {
    this.props.navigation.navigate('App');
  };
  _signUp = () => {
    this.props.navigation.navigate('SignUp');
  };
  _forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282828',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
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
    marginLeft: 10,
    marginRight: 10
  },
  inputStyle: {
    color: 'white'
  },
  btnStyle: {
    backgroundColor: '#D5C046',
    color: 'white',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  textStyle: {
    fontSize: 20,
    color: 'white'
  },
  logoStyle: {
    width: 350,
    height: 80,
    marginBottom: 40
  },
  signupStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 40
  }
});
