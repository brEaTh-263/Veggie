import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SingleCategory from "./SingleCategory";

const Categories = () => {
  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.categoriesContainer}>
        <SingleCategory
          mainCategory="Vegetables"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables.jpg"
          parent={true}
        />
        <SingleCategory
          parent={true}
          mainCategory="Fruits"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Fruits.jpg"
        />
        <SingleCategory
          parent={true}
          mainCategory="Non-Veg"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Non-Veg.jpg"
        />
        <SingleCategory
          parent={true}
          mainCategory="Grains"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Grains.jpg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginVertical: 10,
    marginHorizontal: 15,
    height: 260,
  },
  categoriesContainer: {
    flexWrap: "wrap",
    width: "100%",
    height: 200,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mainCategory: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
});

export default Categories;
