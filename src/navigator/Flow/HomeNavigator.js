import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/Flow/Home/HomeScreen";
import VegetablesCategoryScreen from "../../screens/Flow/Home/Categories/VegetablesScreen";
import FruitsCategoryScreen from "../../screens/Flow/Home/Categories/FruitsScreen";
import FishAndMeatCategoryScreen from "../../screens/Flow/Home/Categories/FishAndMeatScreen";
import FoodgrainsOilAndVinegarCategoryScreen from "../../screens/Flow/Home/Categories/FoodgrainsOilAndVinegarScreen.js";
import AllProductsScreen from "../../screens/Flow/Home/AllProductsScreen";
import DairyBakeryAndEggsScreen from "../../screens/Flow/Home/Categories/DairyBakeryAndEggsScreen";
import CannedAndPackagedScreen from "../../screens/Flow/Home/Categories/CannedAndPackagedScreen";
import SnacksAndBeveragesScreen from "../../screens/Flow/Home/Categories/SnacksAndBeveragesScreen";
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
        name="Fish and MeatCategory"
        component={FishAndMeatCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="Foodgrains,Oil and VinegarCategory"
        component={FoodgrainsOilAndVinegarCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="Dairy,Bakery and EggsCategory"
        component={DairyBakeryAndEggsScreen}
      />
      <HomeStackNavigator.Screen
        name="Canned and PackagedCategory"
        component={CannedAndPackagedScreen}
      />
      <HomeStackNavigator.Screen
        name="Snacks and BeveragesCategory"
        component={SnacksAndBeveragesScreen}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
