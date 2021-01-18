import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeCategoryScreen from "../../screens/Flow/Recipe/RecipeCategoriesScreen";
import SingleRecipeScreen from "../../screens/Flow/Recipe/SingleRecipeScreen";

const RecipeStackNavigator = createStackNavigator();

const RecipeNavigator = () => {
  return (
    <RecipeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <RecipeStackNavigator.Screen
        name="Recipe"
        component={RecipeCategoryScreen}
      />
      <RecipeStackNavigator.Screen
        name="Single Recipe"
        component={SingleRecipeScreen}
      />
    </RecipeStackNavigator.Navigator>
  );
};

export default RecipeNavigator;
