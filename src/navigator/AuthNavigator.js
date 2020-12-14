import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import StartScreen from "../screens/Auth/StartScreen";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
// import OTPScreen from '../screens/Auth/OTPScreen';
// import NewPasswordScreen from '../screens/Auth/NewPasswordScreen';

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNavigator.Screen name="Start" component={StartScreen} />
      <AuthStackNavigator.Screen name="SignUp" component={SignUpScreen} />
      <AuthStackNavigator.Screen name="SignIn" component={SignInScreen} />
      {/* <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStackNavigator.Screen name="OTP" component={OTPScreen} />
      <AuthStackNavigator.Screen
        name="NewPassword"
        component={NewPasswordScreen}
      /> */}
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
