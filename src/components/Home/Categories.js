import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SingleCategory from "./SingleCategory";
import Fonts from "../../constants/fonts";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const Categories = () => {
  const navigation = useNavigation();
  const mainCategories = useSelector((state) => state.Products.mainCategories);
  const allCategories = mainCategories.map((item) => {
    return {
      name: item.mainCategory,
    };
  });
  allCategories.unshift({ name: "All" });
  return (
    <View style={styles.conatiner}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Categories</Text>
        <Text
          style={styles.title}
          onPress={() => {
            navigation.navigate("AllProducts", {
              title: "All Categories",
              categories: allCategories,
              subCategory: false,
            });
          }}
        >
          see all{`>`}
        </Text>
      </View>
      <FlatList
        data={mainCategories}
        keyExtractor={(item) => item.mainCategory}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <SingleCategory
              mainCategory={item.mainCategory}
              source={item.source}
              SubCategories={item.SubCategories}
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
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.Regular,
    color: Colors.primary,
  },
  mainCategory: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
});

export default Categories;
