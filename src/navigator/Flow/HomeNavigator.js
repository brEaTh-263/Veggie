import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/Flow/Home/HomeScreen";
import VegetablesCategoryScreen from "../../screens/Flow/Home/Categories/VegetablesScreen";
import FruitsCategoryScreen from "../../screens/Flow/Home/Categories/FruitsScreen";
import MeatCategoryScreen from "../../screens/Flow/Home/Categories/MeatScreen";
import GrainsCategoryScreen from "../../screens/Flow/Home/Categories/GrainsScreen";
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
        name="MeatCategory"
        component={MeatCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="GrainsCategory"
        component={GrainsCategoryScreen}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
