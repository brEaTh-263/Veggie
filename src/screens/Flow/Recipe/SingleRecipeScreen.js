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
import fonts from "../../../constants/fonts";
import { RecipeItems } from "../../../raw_data";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import RecipeIcons from "../../../components/General/RecipeIcons";
export default function SingleRecipeScreen({ route }) {
  const { title, subCategories } = route.params;
  const token = useSelector((state) => state.Auth.token);
  const sortedItems = RecipeItems.filter((item) => item.category === title);
  // console.log(subCategories);
  const divideWithSubCategories = () => {
    return subCategories.map((i) => {
      const subCategoryItems = sortedItems.filter(
        (item) => item.subCategory === i && item.category === title
      );
      // console.log(subCategoryItems);

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
              return (
                <View style={styles.cardContainer}>
                  {token.length > 0 && (
                    <TouchableOpacity
                      style={styles.bookmarkIconStyle}
                      onPress={async () => {}}
                    >
                      <Ionicons
                        name="leaf-sharp"
                        size={24}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  )}
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      resizeMode="cover"
                      source={require("../../../../assets/recipe.png")}
                      style={{
                        width: "100%",
                        height: 150,
                        alignItems: "center",
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 25,
                        fontSize: 18,
                        textTransform: "uppercase",
                        fontFamily: fonts.Bold,
                        color: Colors.primary,
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        marginTop: 15,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      <RecipeIcons time={item.duration} />
                      <RecipeIcons difficulty={item.difficulty} />
                      <RecipeIcons mode={item.mode} />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      backgroundColor: Colors.primary,
                      overflow: "hidden",
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 18,
                      }}
                    >
                      Add to cart
                    </Text>
                  </TouchableOpacity>
                </View>
              );
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
