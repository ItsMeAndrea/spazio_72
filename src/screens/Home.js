import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Reservación',
    headerStyle: {
      backgroundColor: '#282828'
    },
    headerTitleStyle: {
      color: 'white'
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#282828' }}>
        <Text style={{ color: 'white' }}>HELLO WORLD</Text>

        <Button onPress={() => this.props.navigation.navigate('Reservation')}>
          <Text>Aceptar</Text>
        </Button>
      </View>
    );
  }
}

_reservation = () => {
  this.props.navigation.navigate('Reservation');
};
