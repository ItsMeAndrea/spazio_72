import React, { Component } from 'react';
import app from '../firebase/firebaseConfig';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import Swipeable from 'react-native-swipeable';

const rightButtons = [
  <Button
    style={{
      width: 400,
      height: 80,
      backgroundColor: '#279e29',
      padding: 30
    }}
  >
    <Image
      style={{ width: 20, height: 20 }}
      source={require('../images/edit.png')}
    />
  </Button>,
  <Button
    style={{ width: 400, height: 80, backgroundColor: '#bc2121', padding: 30 }}
  >
    <Image
      style={{ width: 20, height: 20 }}
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
    },
    headerLeft: (
      <Button
        style={{ marginLeft: 10, marginTop: 5 }}
        transparent
        onPress={() => app.auth().signOut()}
      >
        <Image source={require('../images/logout.png')} />
      </Button>
    ),
    headerRight: (
      <Button style={{ marginRight: 10, marginTop: 5 }} transparent>
        <Image source={require('../images/more.png')} />
      </Button>
    )
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#282828' }}>
        <Swipeable
          leftButtonWidth={80}
          rightButtonWidth={80}
          rightButtons={rightButtons}
          style={{
            height: 80,
            backgroundColor: 'gray',
            borderBottomWidth: 1,
            borderBottomColor: 'black'
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 15,
              paddingLeft: 20,
              paddingTop: 10
            }}
          >
            Mariella Duran
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              paddingLeft: 20
            }}
          >
            Lun, 8 de Junio.
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              paddingLeft: 20,

              paddingBottom: 10
            }}
          >
            8:00 AM
          </Text>
        </Swipeable>
        <Swipeable
          leftButtonWidth={80}
          rightButtonWidth={80}
          rightButtons={rightButtons}
          style={{
            height: 80,
            backgroundColor: 'gray'
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 15,
              paddingLeft: 20,
              paddingTop: 10
            }}
          >
            Yolimar Lugo
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              paddingLeft: 20
            }}
          >
            Lun, 8 de Junio.
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              paddingLeft: 20,
              paddingBottom: 10
            }}
          >
            8:00 AM
          </Text>
        </Swipeable>

        <View style={styles.backButtonPosition}>
          <Button rounded style={styles.backButton} onPress={this._camara}>
            <Image
              style={styles.backBtnStyle}
              source={require('../images/camera.png')}
            />
          </Button>
        </View>
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
  },
  backButtonPosition: {
    justifyContent: 'flex-end',
    flex: 1,
    alignSelf: 'center',
    marginBottom: -15
  },
  backButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#D5C046'
  },
  backBtnStyle: {
    height: 40,
    width: 40
  }
});
