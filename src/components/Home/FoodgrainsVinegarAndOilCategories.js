import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SingleCategory from "./SingleCategory";

const FoodgrainsOilAndVinegarCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.categoriesContainerStyle}>
        <SingleCategory
          mainCategory="Foodgrains,Oil and Vinegar"
          subCategory="Foodgrains"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Foodgrains%2COil+and+Vinegar/Foodgrains.jpg"
        />
        <SingleCategory
          mainCategory="Foodgrains,Oil and Vinegar"
          subCategory="Oil and Vinegar"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Foodgrains%2COil+and+Vinegar/Oils+and+Vinegars.jpeg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 15,
    height: 150,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  categoriesContainerStyle: {
    flexWrap: "wrap",
    width: "100%",
    height: 100,
    flexDirection: "row",
  },
});

export default FoodgrainsOilAndVinegarCategories;
