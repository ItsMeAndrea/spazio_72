import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Slick from 'react-native-slick';

export default class Carousel extends Component {
  render() {
    const { wrapper, activeDot, arrowStyle, imgStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        <Slick
          style={wrapper}
          showsButtons={true}
          activeDot={<View style={activeDot} />}
          nextButton={<Text style={arrowStyle}>›</Text>}
          prevButton={<Text style={arrowStyle}>‹</Text>}
        >
          <View style={styles.slide}>
            <Image
              style={imgStyle}
              source={require('../images/slider_1.jpg')}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={imgStyle}
              source={require('../images/slider_2.jpg')}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={imgStyle}
              source={require('../images/slider_3.jpg')}
            />
          </View>
        </Slick>
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
  activeDot: {
    backgroundColor: '#D5C046',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  arrowStyle: {
    color: '#D5C046',
    fontSize: 50
  },
  imgStyle: {
    resizeMode: 'contain',
    flex: 1
  }
});
