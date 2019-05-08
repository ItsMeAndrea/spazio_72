import React, { Component } from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import Camara from '../components/Camara';
import Reservation from '../components/Reservation';

const AppStack = createStackNavigator({
  Reservation: {
    screen: Reservation,
    path: 'reservation/:id'
  },
  Home: {
    screen: Camara
  }
});

const AuthStack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: { screen: AppStack, path: '' },
      Auth: AuthStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

const prefix = 'spazio72://';

const MainApp = () => <AppContainer uriPrefix={prefix} />;

export default MainApp;
