import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Slick from 'react-native-slick';
import { Button } from 'native-base';

import Calendar from './Calendar';
import { ScrollView } from 'react-native-gesture-handler';

export default class Reservation extends Component {
  static navigationOptions = {
    title: 'Tu reservacion es con:',
    headerStyle: {
      backgroundColor: '#282828'
    },
    headerTitleStyle: {
      color: 'white'
    }
  };
  state = { date: new Date() };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#282828' }}>
        <Slick
          style={styles.wrapper}
          showsButtons={true}
          activeDot={
            <View
              style={{
                backgroundColor: '#D5C046',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          nextButton={<Text style={{ color: '#D5C046', fontSize: 50 }}>›</Text>}
          prevButton={<Text style={{ color: '#D5C046', fontSize: 50 }}>‹</Text>}
        >
          <View style={styles.slide}>
            <Image
              style={{ resizeMode: 'contain', flex: 1 }}
              source={require('../images/slider_1.jpg')}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={{ resizeMode: 'contain', flex: 1 }}
              source={require('../images/slider_2.jpg')}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={{ resizeMode: 'contain', flex: 1 }}
              source={require('../images/slider_3.jpg')}
            />
          </View>
        </Slick>

        <View style={{ flex: 1 }}>
          <Calendar />
          <View style={{ height: 60, marginBottom: 45 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Button
                rounded
                style={{
                  backgroundColor: '#D5C046',
                  paddingHorizontal: 30,
                  marginHorizontal: 5
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>8:00 AM</Text>
              </Button>
              <Button
                rounded
                style={{
                  backgroundColor: '#D5C046',
                  paddingHorizontal: 30,
                  marginHorizontal: 5
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>8:00 AM</Text>
              </Button>
              <Button
                rounded
                style={{
                  backgroundColor: '#D5C046',
                  paddingHorizontal: 30,
                  marginHorizontal: 5
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>8:00 AM</Text>
              </Button>
              <Button
                rounded
                style={{
                  backgroundColor: '#D5C046',
                  paddingHorizontal: 30,
                  marginHorizontal: 5
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>8:00 AM</Text>
              </Button>
              <Button
                rounded
                style={{
                  backgroundColor: '#D5C046',
                  paddingHorizontal: 30,
                  marginHorizontal: 5
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>8:00 AM</Text>
              </Button>
            </ScrollView>
          </View>
          <Button block rounded style={styles.btnStyle}>
            <Text style={styles.textStyle}>ACEPTAR</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 2
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828'
  },

  btnStyle: {
    backgroundColor: '#D5C046',
    color: 'white',
    marginHorizontal: 30,
    marginBottom: 40
  },
  textStyle: {
    fontSize: 20,
    color: 'white'
  }
});
