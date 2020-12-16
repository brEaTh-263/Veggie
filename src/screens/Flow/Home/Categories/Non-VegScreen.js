import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import { Button } from "react-native-paper";
import Colors from "../../../../constants/Colors";

import { useSelector } from "react-redux";

const NonVegCategoryScreen = ({ navigation }) => {
  const products = useSelector((state) =>
    state.Products.products.filter((product) => product.Category === "Non-Veg")
  );

  return (
    <ScrollView style={styles.container} centerContent={true}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Non-Veg" textSize={30} />
      </View>
      <Button onPress={() => navigation.navigate("Non-VegProducts")}>
        Browse All
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
});

export default NonVegCategoryScreen;
