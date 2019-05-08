import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Reservation extends Component {
  state = { date: new Date() };
  render() {
    const { id } = this.props.navigation.state.params;
    return (
      <View>
        <Text>HELLO from view {id} </Text>
      </View>
    );
  }
}
