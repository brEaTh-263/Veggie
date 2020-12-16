import React, { useState } from "react";
import { Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import SingleCategory from "./SingleCategory";
import Colors from "../../constants/Colors";

const Categories = ({ showAll, setShowAll }) => {
  return (
    <View style={{ marginVertical: 10, marginHorizontal: 15, height: 390 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
        Shop by Category
      </Text>
      <View
        style={{
          flexWrap: "wrap",
          width: "100%",
          height: "50%",
          flexDirection: "row",
        }}
      >
        <SingleCategory
          mainCategory="Vegetables"
          subCategory="Leaves"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/spinach.jpg"
        />
        <SingleCategory
          mainCategory="Vegetables"
          subCategory="Roots"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/carrot.jpg"
        />
        <SingleCategory
          mainCategory="Vegetables"
          subCategory="Fungi"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/mushroom.jpg"
        />
        <SingleCategory
          mainCategory="Vegetables"
          subCategory="Stems"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/celery.jpg"
        />
        <SingleCategory
          mainCategory="Vegetables"
          subCategory="Seeds"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/sweet-corn.jpg"
        />
        <SingleCategory
          mainCategory="Vegetables"
          subCategory="Indian"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/cowpea.jpg"
        />

        {showAll ? (
          <>
            <SingleCategory
              mainCategory="Vegetables"
              subCategory="Fruits"
              source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/eggplant.jpg"
            />
            <SingleCategory
              mainCategory="Vegetables"
              subCategory="Flowers"
              source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/broccoli.jpg"
            />
            <SingleCategory
              mainCategory="Vegetables"
              subCategory="Bulb and Tuber"
              source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables/garlic.jpg"
            />
          </>
        ) : null}
      </View>
      <Button
        style={{ position: "relative", top: showAll ? 130 : 20 }}
        icon={showAll ? "chevron-up" : "chevron-down"}
        color={Colors.tertiary}
        onPress={() => {
          setShowAll((prevState) => !prevState);
        }}
      >
        {showAll ? "Show less" : "Show more"}
      </Button>
    </View>
  );
};

export default Categories;
