import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";

import { Button } from "react-native-paper";
import FruitsCategories from "../../../../components/Home/FruitsCategories";

const FruitsCategoryScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} centerContent={true}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Fruits" textSize={30} />
      </View>
      <FruitsCategories />
      <Button
        mode="contained"
        style={{ marginHorizontal: 15 }}
        color={Colors.tertiary}
        onPress={() => navigation.navigate("AllProducts", { title: "Fruits" })}
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

export default FruitsCategoryScreen;
