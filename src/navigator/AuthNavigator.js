import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import StartScreen from "../screens/Auth/StartScreen";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNavigator.Screen name="Start" component={StartScreen} />
      <AuthStackNavigator.Screen name="SignUp" component={SignUpScreen} />
      <AuthStackNavigator.Screen name="SignIn" component={SignInScreen} />
      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
