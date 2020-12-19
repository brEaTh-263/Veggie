import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CartNavigator from "./Flow/CartNavigator";
import HomeNavigator from "./Flow/HomeNavigator";
import ProfileNavigator from "./Flow/ProfileNavigator";
import SearchNavigator from "./Flow/SearchNavigator";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const tabOptions = {
  activeTintColor: Colors.tertiary,
  inactiveTintColor: "gray",
  tabStyle: {
    backgroundColor: Colors.bkg,
  },
};

const FlowTabNavigator = createBottomTabNavigator();

const FlowNavigator = () => {
  const items = useSelector((state) => state.Cart.cartProducts.length);
  return (
    <FlowTabNavigator.Navigator tabBarOptions={tabOptions}>
      <FlowTabNavigator.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => {
          let tabBarVisible;
          const routeName = getFocusedRouteNameFromRoute(route);

          if (
            routeName === "VegetablesProducts" ||
            routeName === "GrainsProducts" ||
            routeName === "MeatProducts" ||
            routeName === "FruitsProducts" ||
            routeName === "AllProducts"
          ) {
            tabBarVisible = false;
          } else {
            tabBarVisible = true;
          }

          return {
            tabBarVisible,
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          };
        }}
      />
      <FlowTabNavigator.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <FlowTabNavigator.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="shopping-bag" size={24} color={color} />
          ),
          tabBarBadge: items > 0 ? items : null,
        }}
      />
      <FlowTabNavigator.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({ route }) => {
          let tabBarVisible;
          const routeName = getFocusedRouteNameFromRoute(route);

          if (routeName === "ChangePassword" || routeName === "NewPassword") {
            tabBarVisible = false;
          } else {
            tabBarVisible = true;
          }

          return {
            tabBarVisible,
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          };
        }}
      />
    </FlowTabNavigator.Navigator>
  );
};

export default FlowNavigator;
