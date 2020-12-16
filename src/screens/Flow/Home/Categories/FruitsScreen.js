import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { ScrollView } from "react-native";

const FruitsCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const token = useSelector((state) => state.Profile.token);
  const products = useSelector((state) =>
    state.Products.products.filter((product) => product.Category === "Fruits")
  );

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: Colors.bkg,
        }}
      >
        <ActivityIndicator size="large" color={Colors.tertiary} />
        <Text style={{ fontSize: 20, marginVertical: 15 }}>Loading...</Text>
      </View>
    );
  }
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
        <Header text="Fruits" textSize={30} />
      </View>
      <Button onPress={() => navigation.navigate("FruitsProducts")}>
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

export default FruitsCategoryScreen;
