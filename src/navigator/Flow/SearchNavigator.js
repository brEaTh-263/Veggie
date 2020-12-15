import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchGroceriesScreen from "../../screens/Flow/Search/SearchGroceriesScreen";

const SearchStackNavigator = createStackNavigator();

const SearchNavigator = () => {
  return (
    <SearchStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <SearchStackNavigator.Screen
        name="Search"
        component={SearchGroceriesScreen}
      />
    </SearchStackNavigator.Navigator>
  );
};

export default SearchNavigator;
