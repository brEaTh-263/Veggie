import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SingleCategory from "./SingleCategory";
import Fonts from "../../constants/fonts";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
const Categories = () => {
  const navigation = useNavigation();
  const mainCategories = [
    {
      mainCategory: "Vegetables",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Vegetables.jpg",
      SubCategories: [
        {
          name: "All",
        },
        {
          name: "Leaves",
        },
        {
          name: "Roots",
        },
        {
          name: "Fungi",
        },
        {
          name: "Fruits",
        },
        {
          name: "Indian Vegetables",
        },
        {
          name: "Stems",
        },
        {
          name: "Seeds",
        },
        {
          name: "Flowers",
        },
        {
          name: "Bulb and Tuber",
        },
      ],
    },
    {
      mainCategory: "Fruits",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Fruits.jpg",
      SubCategories: [
        {
          name: "All",
        },
        {
          name: "Exotic",
        },
        {
          name: "Seasonal",
        },
      ],
    },
    {
      mainCategory: "Fish and Meat",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/FishAndMeat.jpeg",
      SubCategories: [
        {
          name: "All",
        },
        {
          name: "Fish",
        },
        {
          name: "Canned",
        },
        {
          name: "Sausage",
        },
        {
          name: "Poultry",
        },
      ],
    },
    {
      mainCategory: "Foodgrains,Oil and Vinegar",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Foodgrains%2COil+And+Vinegar.jpeg",
      SubCategories: [
        {
          name: "All",
        },
        {
          name: "Foodgrains",
        },
        {
          name: "Oil and Vinegar",
        },
      ],
    },
    {
      mainCategory: "Dairy,Bakery and Eggs",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Dairy%2CBakery+and+Eggs.jpeg",
      SubCategories: [
        {
          name: "All",
        },
        {
          name: "Breads",
        },
        {
          name: "Curd,Buttermilk and Cream",
        },
        {
          name: "Milk",
        },
        {
          name: "Paneer,Cheese and Butter",
        },
      ],
    },
    {
      mainCategory: "Canned and Packaged",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Canned+and+Packaged.jpeg",
      SubCategories: [
        {
          name: "All",
        },
        {
          name: "Spreads and Sauce",
        },
        {
          name: "Noodles and Pasta",
        },
        {
          name: "Pickles and Chutney",
        },
        {
          name: "Cereals",
        },
        {
          name: "Frozen Products",
        },
      ],
    },
    {
      mainCategory: "Snacks and Beverages",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Snacks+and+Beverages.jpeg",
      SubCategories: [
        {
          name: "All",
        },
        {
          name: "Chips and Crisps",
        },
        {
          name: "Energy and Soft Drinks",
        },
        {
          name: "Health Drinks",
        },
        {
          name: "Indian Snacks",
        },
        {
          name: "Tea and Coffee",
        },
        {
          name: "Water and Juice",
        },
      ],
    },
    {
      mainCategory: "Self-care and Hygiene",
      source:
        "https://images263.s3-us-west-1.amazonaws.com/Categories/Self-care+and+Hygiene.jpeg",
      SubCategories: [
        {
          name: "All",
        },
      ],
    },
  ];
  return (
    <View style={styles.conatiner}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Categories</Text>
        <Text
          style={styles.title}
          onPress={() => {
            navigation.navigate("AllProducts", {
              title: "All Categories",
              categories: [
                { name: "All" },
                { name: "Vegetables" },
                { name: "Fruits" },
                { name: "Foodgrains,Oil and Vinegar" },
                { name: "Fish and Meat" },
                { name: "Dariy,Bakery and Eggs" },
                {
                  name: "Canned and Packaged",
                },
                {
                  name: "Snacks and Beverages",
                },
                {
                  name: "Self-care and Hygiene",
                },
              ],
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
