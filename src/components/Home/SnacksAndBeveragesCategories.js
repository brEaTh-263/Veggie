import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SingleCategory from "./SingleCategory";

const SnacksAndBeveragesCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.categoriesContainerStyle}>
        <SingleCategory
          mainCategory="Snacks and Beverages"
          subCategory="Chips and Crisps"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages/Chips+and+Crisps.jpeg"
        />
        <SingleCategory
          mainCategory="Snacks and Beverages"
          subCategory="Energy and Soft Drinks"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages/Energy+and+Soft+Drinks.jpeg"
        />
        <SingleCategory
          mainCategory="Snacks and Beverages"
          subCategory="Health Drinks"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages/Health+Drinks.jpeg"
        />
        <SingleCategory
          mainCategory="Snacks and Beverages"
          subCategory="Indian Snacks"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages/Indian+Snacks.jpeg"
        />
        <SingleCategory
          mainCategory="Snacks and Beverages"
          subCategory="Tea and Coffee"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages/Tea+and+Coffee.jpeg"
        />
        <SingleCategory
          mainCategory="Snacks and Beverages"
          subCategory="Water and Juice"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages/Water+and+Juice.jpeg"
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

export default SnacksAndBeveragesCategories;
