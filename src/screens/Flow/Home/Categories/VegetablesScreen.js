import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import VegetablesCategories from "../../../../components/Home/VegetablesCategories";
import Colors from "../../../../constants/Colors";
import { useSelector } from "react-redux";

const VegetablesCategoryScreen = ({ navigation }) => {
  const [showAll, setShowAll] = useState(false);
  const products = useSelector((state) =>
    state.Products.products.filter(
      (product) => product.subCategory === "Leaves"
    )
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.bkg }}
      centerContent={true}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Vegetables" textSize={30} />
      </View>
      <VegetablesCategories setShowAll={setShowAll} showAll={showAll} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginHorizontal: 20,
          position: "relative",
          marginBottom: 10,
          top: showAll ? -10 : -110,
        }}
      >
        Best Sellers
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
});

export default VegetablesCategoryScreen;
