import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SingleCategory from "./SingleCategory";

const DairyBakeryAndEggsCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.categoriesContainerStyle}>
        <SingleCategory
          mainCategory="Dairy,Bakery and Eggs"
          subCategory="Breads"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Dairy%2CBakery+and+Eggs/Breads.jpeg"
        />
        <SingleCategory
          mainCategory="Dairy,Bakery and Eggs"
          subCategory="Curd,Buttermilk and Cream"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Dairy%2CBakery+and+Eggs/Curd%2CButtermilk+and+Cream.jpeg"
        />
        <SingleCategory
          mainCategory="Dairy,Bakery and Eggs"
          subCategory="Milk"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Dairy%2CBakery+and+Eggs/Milk.jpeg"
        />
        <SingleCategory
          mainCategory="Dairy,Bakery and Eggs"
          subCategory="Paneer,Cheese and Butter"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Dairy%2CBakery+and+Eggs/Paneer%2CCheese+and+Butter.jpeg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 15,
    height: 270,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  categoriesContainerStyle: {
    flexWrap: "wrap",
    width: "100%",
    height: 100,
    flexDirection: "row",
  },
});

export default DairyBakeryAndEggsCategories;
