import React, { Component } from 'react';
import app from '../firebaseConfig';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Form, Input, Item, Button } from 'native-base';
import Spinner from '../components/Spinner';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null
  };

  state = { email: '', password: '', error: '', loading: false };

  _Login = () => {
    this.props.navigation.navigate('Login');
  };

  _Register = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.onSignUpSuccess.bind(this))
      .catch(this.onSignUpFailed.bind(this));
  };

  onSignUpFailed() {
    this.setState({ error: 'Auth Failed', loading: false });
  }

  onSignUpSuccess() {
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
      <Button
        block
        rounded
        style={btnStyle}
        onPress={this._Register.bind(this)}
      >
        <Text style={textStyle}>REGRISTRAR</Text>
      </Button>
    );
  }
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
            </Item>

            {/*           <Item rounded style={itemStyle}>
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
            </Item> */}
          </Form>

          <View style={{ marginTop: 20 }}>{this.rendeButton()}</View>
        </View>

        <Text style={styles.errorText}>{this.state.error}</Text>

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
  },
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});
