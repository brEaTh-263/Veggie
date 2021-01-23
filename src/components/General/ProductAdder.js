import React from "react";
import Colors from "../../constants/Colors";
import QuantityAdder from "./QuantityAdder";
import WeightAdder from "./WeightAdder";
import { Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

export default function ProductAdder({
  priceKg,
  priceQty,
  closeSheet,
  _id,
  quantity,
  isKg,
}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Quantity" },
    { key: "second", title: "Weight" },
  ]);

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return (
          <QuantityAdder
            priceQty={priceQty}
            closeSheet={closeSheet}
            _id={_id}
            isKg={isKg}
            quantity={quantity}
          />
        );
      case "second":
        return (
          <WeightAdder
            priceKg={priceKg}
            closeSheet={closeSheet}
            _id={_id}
            isKg={isKg}
            quantity={quantity}
          />
        );
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.tertiary }}
      labelStyle={{
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: 16,
      }}
      activeColor={Colors.tertiary}
      inactiveColor="grey"
      style={{ backgroundColor: "#f3f5f7" }}
    />
  );

  return (
    <TabView
      style={{ borderRadius: 40 }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
