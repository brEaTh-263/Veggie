import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../../screens/Flow/Cart/CartScreen";
import PhoneNumberScreen from "../../screens/Flow/Profile/PersonalInfo/Edit PhoneNumber/PhoneNumberScreen";
import OTPScreen from "../../screens/Flow/Profile/PersonalInfo/Edit PhoneNumber/OTPScreen";

const CartStackNavigator = createStackNavigator();

const CartNavigator = () => {
  return (
    <CartStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <CartStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <CartStackNavigator.Screen
        name="PhoneNumber"
        component={PhoneNumberScreen}
      />
      <CartStackNavigator.Screen name="OTP" component={OTPScreen} />
    </CartStackNavigator.Navigator>
  );
};

export default CartNavigator;
