import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SingleCategory from "./SingleCategory";
import Fonts from "../../constants/fonts";
import Colors from "../../constants/Colors";

const Categories = () => {
  const mainCategories = [
    {
      mainCategory: "Vegetables",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables.jpg",
    },
    {
      mainCategory: "Fruits",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Fruits.jpg",
    },
    {
      mainCategory: "Fish and Meat",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/FishAndMeat.jpeg",
    },
    {
      mainCategory: "Foodgrains,Oil and Vinegar",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Foodgrains%2COil+And+Vinegar.jpeg",
    },
    {
      mainCategory: "Dairy,Bakery and Eggs",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Dairy%2CBakery+and+Eggs.jpeg",
    },
    {
      mainCategory: "Canned and Packaged",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Canned+and+Packaged.jpeg",
    },
    {
      mainCategory: "Snacks and Beverages",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages.jpeg",
    },
    {
      mainCategory: "Self-care and Hygiene",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Self-care+and+Hygiene.jpeg",
    },
  ];
  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={mainCategories}
        keyExtractor={(item) => item.mainCategory}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <SingleCategory
              parent={true}
              mainCategory={item.mainCategory}
              source={item.source}
            />
          );
        }}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginVertical: 10,
    marginHorizontal: 15,
    height: 350,
  },
  categoriesContainer: {
    flexWrap: "wrap",
    width: "100%",
    height: 100,
    flexDirection: "row",
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.Regular,
    color: Colors.primary,
  },
  mainCategory: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
});

export default Categories;
