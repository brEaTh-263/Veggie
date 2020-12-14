import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import React from "react";
import { useSelector } from "react-redux";
import DummyScreen from "../screens/Flow/DummyScreen";
import InitialScreen from "../screens/InitialScreen";

const AppNavigator = () => {
  const Auth = useSelector((state) => state.Auth);
  const { isAuth, didTryAutoLogin } = Auth;
  return (
    <NavigationContainer>
      {isAuth && <DummyScreen />}
      {didTryAutoLogin && !isAuth && <AuthNavigator />}
      {!didTryAutoLogin && !isAuth && <InitialScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
