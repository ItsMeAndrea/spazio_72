import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Form, Input, Item, Button } from 'native-base';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const {
      container,
      itemStyle,
      inputStyle,
      imageStyle,
      btnStyle,
      textStyle,
      backBtnStyle,
      formPosition,
      backButtonPosition,
      backButton
    } = styles;
    return (
      <View style={container}>
        <View style={formPosition}>
          <Form>
            <Item rounded style={itemStyle}>
              <Image
                style={imageStyle}
                source={require('../images/username.png')}
              />
              <Input
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Ingrese Correo Electronico"
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
                placeholder="Confirmar Contraseña"
                placeholderTextColor="white"
              />
            </Item>
          </Form>

          <View>
            <Button block rounded style={btnStyle}>
              <Text style={textStyle}>REGRISTRAR</Text>
            </Button>
          </View>
        </View>

        <View style={backButtonPosition}>
          <Button rounded style={backButton} onPress={this._Login}>
            <Image
              style={backBtnStyle}
              source={require('../images/left-arrow.png')}
            />
          </Button>
        </View>
      </View>
    );
  }

  _Login = () => {
    this.props.navigation.navigate('Login');
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282828',
    flex: 1,
    flexDirection: 'column'
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
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  textStyle: {
    fontSize: 20,
    color: 'white'
  },
  backBtnStyle: {
    height: 20,
    width: 20
  },
  formPosition: {
    justifyContent: 'center',
    flex: 8
  },
  backButtonPosition: {
    justifyContent: 'flex-end',
    flex: 1,
    marginLeft: 30,
    marginBottom: 30
  },
  backButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#D5C046'
  }
});
