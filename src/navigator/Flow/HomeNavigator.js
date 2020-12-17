import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/Flow/Home/HomeScreen";
import VegetablesCategoryScreen from "../../screens/Flow/Home/Categories/VegetablesScreen";
import FruitsCategoryScreen from "../../screens/Flow/Home/Categories/FruitsScreen";
import NonVegCategoryScreen from "../../screens/Flow/Home/Categories/Non-VegScreen";
import GrainsCategoryScreen from "../../screens/Flow/Home/Categories/GrainsScreen";
import VegetablesProductsScreen from "../../screens/Flow/Home/Products/VegetablesScreen";
import FruitsProductsScreen from "../../screens/Flow/Home/Products/FruitsScreen";
import GrainsProductsScreen from "../../screens/Flow/Home/Products/GrainsScreen";
import NonVegProductsScreen from "../../screens/Flow/Home/Products/Non-VegScreen";
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
      <HomeStackNavigator.Screen
        name="VegetablesCategory"
        component={VegetablesCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="FruitsCategory"
        component={FruitsCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="Non-VegCategory"
        component={NonVegCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="GrainsCategory"
        component={GrainsCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="VegetablesProducts"
        component={VegetablesProductsScreen}
      />
      <HomeStackNavigator.Screen
        name="FruitsProducts"
        component={FruitsProductsScreen}
      />
      <HomeStackNavigator.Screen
        name="GrainsProducts"
        component={GrainsProductsScreen}
      />
      <HomeStackNavigator.Screen
        name="Non-VegProducts"
        component={NonVegProductsScreen}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
