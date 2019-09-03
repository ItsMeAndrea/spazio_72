import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Form, Item, Input, Button } from 'native-base';
import Spinner from '../components/Spinner';

class App extends Component {
  static navigationOptions = {
    header: null
  };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  _login = () => {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  };

  _signUp = () => {
    this.props.navigation.navigate('SignUp');
  };
  _forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  renderButton() {
    const { btnStyle, textStyle } = styles;
    if (this.props.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button block rounded style={btnStyle} onPress={this._login.bind(this)}>
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
              value={this.props.email}
              onChangeText={this.onEmailChange.bind(this)}
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
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
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

        <View style={{ marginTop: 20 }}>{this.renderButton()}</View>

        <View />

        <Text style={styles.errorText}>{this.props.error}</Text>
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
    fontSize: 18,
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
    fontSize: 8,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = state => {
  const { email, password, error, loading } = state.auth;
  return {
    email: email,
    password: password,
    error: error,
    loading: loading
  };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser }
)(App);
