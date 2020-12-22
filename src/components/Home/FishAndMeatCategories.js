import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SingleCategory from "./SingleCategory";

const FishAndMeatCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.categoriesContainerStyle}>
        <SingleCategory
          mainCategory="Fish and Meat"
          subCategory="Fish"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Fish+and+Meat/Fish.jpg"
        />
        <SingleCategory
          mainCategory="Fish and Meat"
          subCategory="Canned"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Fish+and+Meat/Canned.jpeg"
        />
        <SingleCategory
          mainCategory="Fish and Meat"
          subCategory="Sausage"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Fish+and+Meat/Sausage.jpeg"
        />
        <SingleCategory
          mainCategory="Fish and Meat"
          subCategory="Poultry"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Fish+and+Meat/Poultry.jpeg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 15,
    height: 260,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  categoriesContainerStyle: {
    flexWrap: "wrap",
    width: "100%",
    height: 100,
    flexDirection: "row",
  },
});

export default FishAndMeatCategories;
