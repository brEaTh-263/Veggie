import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SingleCategory from "./SingleCategory";

const CannedAndPackagedCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.categoriesContainerStyle}>
        <SingleCategory
          mainCategory="Canned and Packaged"
          subCategory="Spreads and Sauce"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Dairy%2CBakery+and+Eggs/Breads.jpeg"
        />
        <SingleCategory
          mainCategory="Canned and Packaged"
          subCategory="Noodles and Pasta"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Canned+and+Packaged/Noodles+and+Pasta.jpeg"
        />
        <SingleCategory
          mainCategory="Canned and Packaged"
          subCategory="Pickles and Chutney"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Canned+and+Packaged/Pickles+and+Chutneys.jpeg"
        />
        <SingleCategory
          mainCategory="Canned and Packaged"
          subCategory="Cereals"
          source="https://images263.s3-us-west-1.amazonaws.com/Categories/Canned+and+Packaged/Cereals.jpeg"
        />
        <SingleCategory
          mainCategory="Canned and Packaged"
          subCategory="Frozen Products"
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

export default CannedAndPackagedCategories;
