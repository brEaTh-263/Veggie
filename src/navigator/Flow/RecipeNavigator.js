import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeScreen from "../../screens/Flow/Recipe/RecipeScreen";

const RecipeStackNavigator = createStackNavigator();

const RecipeNavigator = () => {
  return (
    <RecipeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <RecipeStackNavigator.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ headerShown: false }}
      />
    </RecipeStackNavigator.Navigator>
  );
};

export default RecipeNavigator;
