import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../../screens/Flow/Cart/CartScreen";

const CartStackNavigator = createStackNavigator();

const CartNavigator = () => {
  return (
    <CartStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <CartStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
    </CartStackNavigator.Navigator>
  );
};

export default CartNavigator;
