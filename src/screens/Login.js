import React, { Component } from 'react';
import app from '../firebaseConfig';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Form, Item, Input, Button } from 'native-base';
import Spinner from '../components/Spinner';

export default class App extends Component {
  static navigationOptions = {
    header: null
  };

  state = { email: '', password: '', error: '', loading: false };

  _login = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFailed.bind(this));
  };
  _signUp = () => {
    this.props.navigation.navigate('SignUp');
  };
  _forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  onLoginFailed() {
    this.setState({ error: 'Auth Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    this.props.navigation.navigate('App');
  }

  rendeButton() {
    const { btnStyle, textStyle } = styles;
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button block rounded style={btnStyle} onPress={this._login}>
        <Text style={textStyle}>INGRESAR</Text>
      </Button>
    );
  }

  render() {
    const {
      container,
      logoStyle,
      itemStyle,
      imageStyle,
      inputStyle,
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
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
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
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <Image
              style={imageStyle}
              source={require('../images/eye_black.png')}
            />
          </Item>
        </Form>

        <View style={signupStyle}>
          <Button transparent onPress={this._signUp}>
            <Text style={{ color: 'white', fontSize: 10 }}>Registrarse</Text>
          </Button>
          <Button transparent onPress={this._forgotPassword}>
            <Text style={{ color: 'white', fontSize: 10 }}>
              Recuperar Contraseña
            </Text>
          </Button>
        </View>

        <View style={{ marginTop: 20 }}>{this.rendeButton()}</View>

        <View />

        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    );
  }
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
    color: 'white',
    fontSize: 10
  },
  btnStyle: {
    backgroundColor: '#D5C046',
    color: 'white',
    marginHorizontal: 30
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
  },
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});
