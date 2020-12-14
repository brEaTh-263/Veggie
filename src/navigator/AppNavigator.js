import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import React from "react";
// import FlowNavigator from './FlowNavigator';
// import InitialScreen from '../screens/InitialScreen';
import { useSelector } from "react-redux";

const AppNavigator = () => {
	// const Auth = useSelector((state) => state.Auth);
	// const {isAuth, didTryAutoLogin} = Auth;
	// console.log(Auth);

	// console.log('Under navigator');
	// console.log(isAuth, didTryAutoLogin);
	return (
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	);
};

export default AppNavigator;
