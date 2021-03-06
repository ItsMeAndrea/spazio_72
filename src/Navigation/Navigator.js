import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import Loading from '../screens/Loading';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import Camara from '../screens/Camara';
import Reservation from '../screens/Reservation';
import Home from '../screens/Home';

const AppStack = createStackNavigator({
  Home: Home,
  Reservation: Reservation,
  Camara: Camara
});

const AuthStack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Load: Loading,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Load'
    }
  )
);

const prefix = 'spazio72://';

const MainApp = () => <AppContainer uriPrefix={prefix} />;

export default MainApp;
