import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Slick from 'react-native-slick';
import DatePicker from 'react-native-date-picker';

export default class Reservation extends Component {
  state = { date: new Date() };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Slick style={styles.wrapper} showsButtons>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Slick</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Slick>
        <DatePicker
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
