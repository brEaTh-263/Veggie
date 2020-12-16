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
import { useSelector } from "react-redux";

const GrainsCategoryScreen = ({ navigation }) => {
  const products = useSelector((state) =>
    state.Products.products.filter((product) => product.Category === "Grains")
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
        <Header text="Grains" textSize={30} />
      </View>
      <Button onPress={() => navigation.navigate("GrainsProducts")}>
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

export default GrainsCategoryScreen;
