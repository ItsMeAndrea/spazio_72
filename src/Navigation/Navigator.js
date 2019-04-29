import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import Camara from '../components/Camara';

const AppStack = createStackNavigator({ Home: Camara });
const AuthStack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);
