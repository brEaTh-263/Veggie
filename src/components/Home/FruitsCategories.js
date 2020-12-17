import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SingleCategory from "./SingleCategory";

const FruitsCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.categoriesContainerStyle}>
        <SingleCategory
          mainCategory="Fruits"
          subCategory="Seasonal"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Fruits/Seasonal.jpg"
        />
        <SingleCategory
          mainCategory="Fruits"
          subCategory="Exotic"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Fruits/Exotic.jpg"
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
    // borderWidth: 1,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  categoriesContainerStyle: {
    // flexWrap: "wrap",
    width: "100%",
    height: 100,
    // borderWidth: 1,
    flexDirection: "row",
  },
});

export default FruitsCategories;
