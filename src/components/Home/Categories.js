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
          mainCategory="Fish and Meat"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/FishAndMeat.jpeg"
        />

        <SingleCategory
          parent={true}
          mainCategory="Foodgrains,Oil and Vinegar"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Foodgrains%2COil+And+Vinegar.jpeg"
        />
        <SingleCategory
          parent={true}
          mainCategory="Dairy,Bakery and Eggs"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Dairy%2CBakery+and+Eggs.jpeg"
        />
        <SingleCategory
          parent={true}
          mainCategory="Canned and Packaged"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Canned+and+Packaged.jpeg"
        />
        <SingleCategory
          parent={true}
          mainCategory="Snacks and Beverages"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages.jpeg"
        />
        <SingleCategory
          parent={true}
          mainCategory="Self-care and Hygiene"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Self-care+and+Hygiene.jpeg"
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
    height: 100,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mainCategory: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
});

export default Categories;
