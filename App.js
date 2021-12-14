import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {Provider as AuthProvider} from './src/context/AuthContext';
import QrScreen from "./src/screens/QrScreen";
import Scanned from "./src/screens/Scanned";
import Signin from './src/screens/Signin';
import Signup from "./src/screens/Signup";
import RegisterScreen from "./src/screens/RegisterScreen";
import { setNavigator } from './src/navigationRef';
import paymentScreen from "./src/screens/paymentScreen";

const navigator = createStackNavigator(
  {
    paymentScreen,
    RegisterScreen,
    Signin,
    Signup,
    QrScreen,
    Scanned,
  },
  {
    initialRouteName: "Signin",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

const App =  createAppContainer(navigator);

export default () => {
  return (
  <AuthProvider>
    <App ref = {(navigator) => {setNavigator(navigator)}}/>
  </AuthProvider>
  );
};