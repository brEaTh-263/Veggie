import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Header from "../../../components/General/Header";
import Colors from "../../../constants/Colors";
import { RecipeItems } from "../../../raw_data";
import { useSelector } from "react-redux";

import RecipeItem from "../../../components/General/RecipeItem";
export default function SingleRecipeScreen({ route }) {
  const { title, subCategories } = route.params;
  const sortedItems = RecipeItems.filter((item) => item.category === title);
  const divideWithSubCategories = () => {
    return subCategories.map((i) => {
      const subCategoryItems = sortedItems.filter(
        (item) => item.subCategory === i && item.category === title
      );

      return (
        <View key={i}>
          <Text
            style={{
              opacity: 0.8,
              fontSize: 18,
              marginHorizontal: 20,
              marginTop: 15,
              textTransform: "uppercase",
            }}
          >
            {i}
          </Text>

          <FlatList
            data={subCategoryItems}
            horizontal={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <RecipeItem item={item} />;
            }}
          />
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header text={title} />
      {divideWithSubCategories()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
  cardContainer: {
    width: 280,
    marginHorizontal: 10,
    height: 300,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 20,
    opacity: 20,
    // borderWidth: 1,
  },
  textStyle: {
    fontSize: 13,
    marginLeft: 5,
  },
  bookmarkIconStyle: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
