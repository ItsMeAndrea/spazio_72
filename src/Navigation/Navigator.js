import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import Loading from "../screens/Loading";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import Camara from "../screens/Camara";
import Reservation from "../screens/Reservation";
import Home from "../screens/Home";
import EditReservation from "../screens/EditReservation";
import Admin from "../screens/Admin";
import BookingSlots from "../screens/BookingSlots";
import EditBookingSlots from "../screens/EditBookingSlots";
import CodigoEmpleado from "../screens/CodigoEmpleado";
import NuevoEmpleado from "../screens/NuevoEmpleado";
import VerReservaciones from "../screens/VerReservaciones";

const AppStack = createStackNavigator(
  {
    Home: { screen: Home },
    Reservation: { screen: Reservation },
    Booking: BookingSlots,
    Camara: Camara,
    EditReservation: EditReservation,
    EditBooking: EditBookingSlots
  },
  {
    initialRouteName: "Home"
  }
);

const AuthStack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword
});

const AdminStack = createStackNavigator({
  Home: Admin,
  NuevoEmpleado: NuevoEmpleado,
  CodigoEmpleado: CodigoEmpleado,
  VerReservaciones: VerReservaciones
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Load: Loading,
      App: AppStack,
      Auth: AuthStack,
      Admin: AdminStack
    },
    {
      initialRouteName: "Load"
    }
  )
);

const MainApp = () => <AppContainer />;

export default MainApp;
