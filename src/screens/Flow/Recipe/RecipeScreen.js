import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Header from "../../../components/General/Header";
import Colors from "../../../constants/Colors";
import { Searchbar } from "react-native-paper";
import { Categories } from "../../../raw_data";
import fonts from "../../../constants/fonts";

let colorCodes = [
  "#dadeab",
  "#fdbef3",
  "#fadd77",
  "#9edad7",
  "#ff813a",
  "#f44040",
  "#e5efc7",
  "#fdaa7b",
  "#b898e1",
];

const RecipeScreen = () => {
  return (
    <View style={styles.container}>
      <Header text="Recipe Box" />

      <FlatList
        data={Categories}
        numColumns={2}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={
          <Searchbar
            style={{
              marginVertical: 25,
              marginHorizontal: 15,
              borderRadius: 20,
              overflow: "hidden",
            }}
            placeholder="I want to cook.."
            onChangeText={(text) => {}}
          />
        }
        renderItem={({ item }) => {
          var color = colorCodes[Math.floor(Math.random() * colorCodes.length)];
          return (
            <View style={[styles.cardContainer, { backgroundColor: color }]}>
              <View style={{ marginVertical: 10 }}>
                {/* <View
                  style={{
                    // borderWidth: 1,
                    // alignItems: "center",
                    justifyContent: "center",
                  }}
                > */}
                <Image
                  source={require("../../../../assets/pizza.png")}
                  resizeMode="cover"
                  style={{ width: "80%", height: 110 }}
                />
                {/* </View> */}
                <Text
                  style={{
                    fontFamily: fonts.Bold,
                    textAlign: "center",
                    fontSize: 18,
                    color: "black",
                    zIndex: 10000,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
  cardContainer: {
    marginHorizontal: 10,
    height: 180,
    width: "45%",
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: "center",
  },
});

export default RecipeScreen;
