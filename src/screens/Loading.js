import React, { Component } from 'react';
import app from '../firebase/firebaseConfig';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

class Loading extends Component {
  componentDidMount() {
    app.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoStyle}
          source={require('../images/logo.png')}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828'
  },
  logoStyle: {
    width: 350,
    height: 80
  }
});

export default Loading;
