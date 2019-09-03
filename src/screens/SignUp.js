import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  nameChanged,
  apellidoChanged,
  emailChanged,
  passwordChanged,
  signUpUser
} from '../actions';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Form, Input, Item, Button } from 'native-base';
import Spinner from '../components/Spinner';

class SignUp extends Component {
  static navigationOptions = {
    header: null
  };

  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onApellidoChange(text) {
    this.props.apellidoChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  _Login = () => {
    this.props.navigation.navigate('Login');
  };

  _Register = () => {
    const { email, password, nombre, apellido, isAdmin } = this.props;
    this.props.signUpUser({ email, password, nombre, apellido, isAdmin });
    this.props.navigation.navigate('Login');
  };

  renderButton() {
    const { btnStyle, textStyle } = styles;
    if (this.props.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button
        block
        rounded
        style={btnStyle}
        onPress={this._Register.bind(this)}
      >
        <Text style={textStyle}>REGISTRAR</Text>
      </Button>
    );
  }

  render() {
    const {
      container,
      itemStyle,
      inputStyle,
      imageStyle,
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
                placeholder="Nombre"
                placeholderTextColor="white"
                value={this.props.nombre}
                onChangeText={this.onNameChange.bind(this)}
              />
            </Item>
            <Item rounded style={itemStyle}>
              <Image
                style={imageStyle}
                source={require('../images/username.png')}
              />
              <Input
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Apellido"
                placeholderTextColor="white"
                value={this.props.apellido}
                onChangeText={this.onApellidoChange.bind(this)}
              />
            </Item>
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
                value={this.props.email}
                onChangeText={this.onEmailChange.bind(this)}
              />
            </Item>
            {console.log(this.props.email)}

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

          <View style={{ marginTop: 20 }}>{this.renderButton()}</View>
        </View>

        <Text style={styles.errorText}>{this.props.error}</Text>

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
    marginRight: 30,
    marginLeft: 30,
    height: 30,
    marginBottom: 10,
    color: 'white'
  },
  imageStyle: {
    height: 20,
    width: 20,
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
    fontSize: 18,
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
    fontSize: 8,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = state => {
  const {
    nombre,
    apellido,
    email,
    password,
    error,
    loading,
    isAdmin
  } = state.auth;
  return {
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password,
    error: error,
    loading: loading,
    isAdmin: isAdmin
  };
};

export default connect(
  mapStateToProps,
  { nameChanged, apellidoChanged, emailChanged, passwordChanged, signUpUser }
)(SignUp);
