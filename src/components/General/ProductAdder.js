import * as React from "react";
import Colors from "../../constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import QuantityAdder from "./QuantityAdder";
import WeightAdder from "./WeightAdder";

const Tab = createMaterialTopTabNavigator();

export default function ProductAdder({
  priceKg,
  priceQty,
  closeSheet,
  _id,
  quantity,
  isKg,
}) {
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
          <QuantityAdder
            priceQty={priceQty}
            closeSheet={closeSheet}
            _id={_id}
            isKg={isKg}
            quantity={quantity}
          />
        )}
      />
      <Tab.Screen
        name="Weight"
        children={(props) => (
          <WeightAdder
            priceKg={priceKg}
            closeSheet={closeSheet}
            _id={_id}
            isKg={isKg}
            quantity={quantity}
          />
        )}
      />
    </Tab.Navigator>
  );
}
