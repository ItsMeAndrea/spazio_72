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
import ScanScreen from "../screens/Camara";
import Reservation from "../screens/Reservation";
import Home from "../screens/Home";
import EditReservation from "../screens/EditReservation";
import Admin from "../screens/Admin";
import BookingSlots from "../screens/BookingSlots";
import EditBookingSlots from "../screens/EditBookingSlots";
import CodigoEmpleado from "../screens/CodigoEmpleado";
import NuevoEmpleado from "../screens/NuevoEmpleado";
import VerReservaciones from "../screens/VerReservaciones";
import VerUsuarios from "../screens/VerUsuarios";
import VerEmpleados from "../screens/VerEmpleados";
import NuevoServicio from "../screens/NuevoServicio";
import VerServicios from "../screens/VerServicios";
import EditarEmpleado from "../screens/EditarEmpleado";
import UserSelectServicio from "../screens/UserSelectServicio";
import EditServicios from "../screens/EditServicios";
import AdminEditReservation from "../screens/AdminEditReservation";
import AdminEditServicio from "../screens/AdminEditServicio";
import AdminEditBookingSlots from "../screens/AdminEditBookingSlots";
import AdminEditUser from "../screens/AdminEditUser";
import ValorDolar from "../screens/ValorDolar";
import EditAdminServ from "../screens/EditAdminServ";

const AppStack = createStackNavigator(
  {
    Home: { screen: Home },
    Reservation: { screen: Reservation },
    Booking: BookingSlots,
    Camara: ScanScreen,
    EditReservation: EditReservation,
    EditBooking: EditBookingSlots,
    UserSelectServicio: UserSelectServicio,
    EditServicios: EditServicios
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
  VerReservaciones: VerReservaciones,
  VerUsuarios: VerUsuarios,
  VerEmpleados: VerEmpleados,
  NuevoServicio: NuevoServicio,
  VerServicios: VerServicios,
  EditarEmpleado: EditarEmpleado,
  EditarReserva: AdminEditReservation,
  EditarServicio: AdminEditServicio,
  EditarBooking: AdminEditBookingSlots,
  EditarUsuario: AdminEditUser,
  ValorDolar: ValorDolar,
  EditAdminServ: EditAdminServ
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
