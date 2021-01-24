import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
const AddInCartButton = ({ showValue, addToCart, removeFromCart }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.priceStyle}>{showValue()}</Text>
      <Button
        onPress={() => {
          addToCart();
        }}
        mode="contained"
        icon="cart-outline"
        color={Colors.primary}
        contentStyle={{
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        style={{
          borderRadius: 20,
          marginRight: 20,
          marginLeft: 20,
        }}
      >
        Add to cart
      </Button>
      <TouchableOpacity
        onPress={() => {
          removeFromCart();
        }}
        style={{ backgroundColor: "#fff", padding: 10, borderRadius: 20 }}
      >
        <MaterialIcons name="delete" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default AddInCartButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    left: 0,
  },
  priceStyle: {
    marginRight: 30,
    marginLeft: 25,
    fontSize: 25,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
