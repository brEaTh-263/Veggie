import * as React from "react";
import Colors from "../../constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import QuantityAdder from "./QuantityAdder";
import WeightAdder from "./WeightAdder";

const Tab = createMaterialTopTabNavigator();

export default function ProductAdder({ price, closeSheet, _id }) {
  return (
    <Tab.Navigator
      style={{ borderRadius: 50 }}
      tabBarOptions={{
        labelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
          fontSize: 16,
        },
        activeTintColor: Colors.tertiary,
        inactiveTintColor: "gray",
        tabStyle: {
          height: 40,
        },

        contentContainerStyle: {
          backgroundColor: "#f4f5f7",
        },
      }}
    >
      <Tab.Screen
        name="Quantity"
        children={(props) => (
          <QuantityAdder price={price} closeSheet={closeSheet} _id={_id} />
        )}
      />
      <Tab.Screen
        name="Weight"
        children={(props) => (
          <WeightAdder price={price} closeSheet={closeSheet} _id={_id} />
        )}
      />
    </Tab.Navigator>
  );
}
