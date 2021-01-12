import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import SingleCategory from "./SingleCategory";
import SubCategories from "../../raw_data";
import { useNavigation } from "@react-navigation/native";
const Categories = ({ title }) => {
  const navigation = useNavigation();
  const sorted = SubCategories.filter((prod) => title === prod.mainCategory);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Categories</Text>
        <Text
          style={styles.title}
          onPress={() => {
            navigation.navigate("AllProducts", {
              title: title,
              subCategory: false,
            });
          }}
        >
          see all{`>`}
        </Text>
      </View>
      <View style={styles.categoriesContainerStyle}>
        <FlatList
          data={sorted}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.subCategory}
          renderItem={({ item }) => {
            return (
              <SingleCategory
                subCategory={item.subCategory}
                mainCategory={item.mainCategory}
                source={item.source}
              />
            );
          }}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 15,
    height: 370,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    color: Colors.tertiary,
    fontFamily: fonts.Regular,
  },
  categoriesContainerStyle: {
    flexWrap: "wrap",
    width: "100%",
    height: 100,
    flexDirection: "row",
  },
});

export default Categories;
