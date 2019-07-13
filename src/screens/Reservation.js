import React, { Component } from 'react';
import { View, StyleSheet, Text, Modal, Alert } from 'react-native';
import { Button } from 'native-base';

import Calendario from '../components/Calendario';
import ScrollButtons from '../components/ScrollButtons';

export default class Reservation extends Component {
  static navigationOptions = {
    title: 'Reservación',
    headerStyle: {
      backgroundColor: '#282828'
    },
    headerTitleStyle: {
      color: 'white'
    }
  };

  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { textStyle, btnStyle, container } = styles;
    return (
      <View style={container}>
        <Calendario />

        <ScrollButtons />
        <Button
          block
          rounded
          style={btnStyle}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={textStyle}>ACEPTAR</Text>
        </Button>

        {/* MODAL */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              backgroundColor: '#00000070',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: 350,
                height: 220,
                backgroundColor: '#282828',
                padding: 30,
                borderRadius: 20
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center'
                }}
              >
                ¿Confirma que desea realizar su reservacion a las 8:00 AM con
                Mariella Duran?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 40
                }}
              >
                <Button
                  rounded
                  style={{
                    backgroundColor: '#D5C046',
                    color: 'white',
                    padding: 20,
                    width: 120,
                    justifyContent: 'center'
                  }}
                  onPress={() => this.props.navigation.navigate('Home')}
                >
                  <Text style={textStyle}>Aceptar</Text>
                </Button>

                <Button
                  rounded
                  style={{
                    backgroundColor: '#D5C046',
                    color: 'white',
                    padding: 20,
                    width: 120,
                    justifyContent: 'center'
                  }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={textStyle}>Cancelar</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
