import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Reservation extends Component {
  render() {
    const { id } = this.props.navigation.state.params;
    return (
      <View>
        <Text>HELLO from view {id}</Text>
      </View>
    );
  }
}
