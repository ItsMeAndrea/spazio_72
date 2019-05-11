import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Slick from 'react-native-slick';

export default class Reservation extends Component {
  static navigationOptions = {
    header: null
  };
  state = { date: new Date() };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Slick style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <Image
              style={{ resizeMode: 'contain', flex: 1 }}
              source={require('../images/slider_1.jpg')}
            />
          </View>
          <View style={styles.slide2}>
            <Image
              style={{ resizeMode: 'contain', flex: 1 }}
              source={require('../images/slider_2.jpg')}
            />
          </View>
          <View style={styles.slide3}>
            <Image
              style={{ resizeMode: 'contain', flex: 1 }}
              source={require('../images/slider_3.jpg')}
            />
          </View>
        </Slick>
        <View style={{ flex: 2, backgroundColor: 'red' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828'
  }
});
