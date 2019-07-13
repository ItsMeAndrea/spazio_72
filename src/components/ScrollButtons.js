import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'native-base';

export default class ScrollButtons extends Component {
  render() {
    const { btnStyle, textStyle, container } = styles;
    return (
      <View style={container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Button rounded style={btnStyle}>
            <Text style={textStyle}>8:00 AM</Text>
          </Button>
          <Button rounded style={btnStyle}>
            <Text style={textStyle}>9:00 AM</Text>
          </Button>
          <Button rounded style={btnStyle}>
            <Text style={textStyle}>10:00 AM</Text>
          </Button>
          <Button rounded style={btnStyle}>
            <Text style={textStyle}>11:00 AM</Text>
          </Button>
          <Button rounded style={btnStyle}>
            <Text style={textStyle}>12:00 AM</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 35
  },
  btnStyle: {
    backgroundColor: '#D5C046',
    paddingHorizontal: 30,
    marginHorizontal: 5
  },
  textStyle: {
    color: 'white',
    fontSize: 20
  }
});
