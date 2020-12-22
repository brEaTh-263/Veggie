import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";
import { Button } from "react-native-paper";
import FishAndMeatCategories from "../../../../components/Home/FishAndMeatCategories";

const FishAndMeatScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} centerContent={true}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Fish and Meat" textSize={30} />
      </View>
      <FishAndMeatCategories />
      <Button
        mode="contained"
        style={{ marginHorizontal: 15 }}
        color={Colors.tertiary}
        onPress={() =>
          navigation.navigate("AllProducts", {
            title: "Fish and Meat",
            subCategory: false,
          })
        }
      >
        View All
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
});

export default FishAndMeatScreen;
