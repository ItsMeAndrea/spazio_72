import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import Swipeable from 'react-native-swipeable';

const rightButtons = [
  <Button
    style={{
      width: 400,
      height: 100,
      backgroundColor: '#279e29',
      padding: 35
    }}
  >
    <Image
      style={{ width: 30, height: 30 }}
      source={require('../images/edit.png')}
    />
  </Button>,
  <Button
    style={{ width: 400, height: 100, backgroundColor: '#bc2121', padding: 35 }}
  >
    <Image
      style={{ width: 30, height: 30 }}
      source={require('../images/cancel.png')}
    />
  </Button>
];

export default class Home extends Component {
  static navigationOptions = {
    title: 'Tus Reservaciones',
    headerStyle: {
      backgroundColor: '#282828'
    },
    headerTitleStyle: {
      color: 'white',
      textAlign: 'center',
      flex: 1
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#282828' }}>
        <Swipeable
          leftButtonWidth={100}
          rightButtonWidth={100}
          rightButtons={rightButtons}
          style={{
            height: 100,
            backgroundColor: 'gray'
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              paddingLeft: 20,
              paddingTop: 10
            }}
          >
            Mariella Duran
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              paddingLeft: 20
            }}
          >
            Lun, 8 de Junio.
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              paddingLeft: 20,

              paddingBottom: 10
            }}
          >
            8:00 AM
          </Text>
        </Swipeable>
        <Swipeable
          leftButtonWidth={100}
          rightButtonWidth={100}
          rightButtons={rightButtons}
          style={{
            height: 100,
            backgroundColor: 'gray'
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              paddingLeft: 20,
              paddingTop: 10
            }}
          >
            Yolimar Lugo
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              paddingLeft: 20
            }}
          >
            Lun, 8 de Junio.
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              paddingLeft: 20,
              paddingBottom: 10
            }}
          >
            8:00 AM
          </Text>
        </Swipeable>
        <Button block rounded style={styles.btnStyle} onPress={this._camara}>
          <Text style={styles.textStyle}>INGRESAR</Text>
        </Button>
      </View>
    );
  }

  _camara = () => {
    this.props.navigation.navigate('Reservation');
  };
}

const styles = StyleSheet.create({
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
  }
});
