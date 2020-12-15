import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/Flow/Home/HomeScreen";
// import VegetablesProductsScreen from "../screens/Home/Products/VegetablesScreen";
// import VegetablesCategoryScreen from "../screens/Home/Categories/VegetablesScreen";
// import MeatCategoryScreen from "../screens/Home/Categories/Non-VegScreen";
// import GrainsCategoryScreen from "../screens/Home/Categories/GrainsScreen";
// import FruitsCategoryScreen from "../screens/Home/Categories/FruitsScreen";
// import FruitsProductsScreen from "../screens/Home/Products/FruitsScreen";
// import MeatProductsScreen from "../screens/Home/Products/Non-VegScreen";
// import GrainsProductsScreen from "../screens/Home/Products/GrainsScreen";
const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
      {/* <HomeStackNavigator.Screen
        name="VegetablesCategory"
        component={VegetablesCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="FruitsCategory"
        component={FruitsCategoryScreen}
      />
      <HomeStackNavigator.Screen
        name="Non-VegCategory"
        component={MeatCategoryScreen}
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
        component={MeatProductsScreen}
      /> */}
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
