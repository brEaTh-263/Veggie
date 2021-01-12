import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/Flow/Home/HomeScreen";
import CategoryScreen from "../../screens/Flow/Home/CategoryScreen";
import AllProductsScreen from "../../screens/Flow/Home/AllProductsScreen";
const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
      <HomeStackNavigator.Screen
        name="AllProducts"
        component={AllProductsScreen}
      />
      <HomeStackNavigator.Screen name="Category" component={CategoryScreen} />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
