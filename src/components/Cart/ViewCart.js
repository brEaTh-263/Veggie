import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const ViewCart = ({ navigation }) => {
  const productsSize = useSelector((state) => state.Cart.cartProducts.length);
  const amount = useSelector((state) => state.Cart.totalAmount);
  return (
    <TouchableOpacity
      style={{
        borderRadius: 1,
        padding: 10,
        backgroundColor: Colors.tertiary,
      }}
      onPress={() => navigation.navigate("Cart")}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.textStyle}>
          {productsSize} items | Amount: Rs{amount}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo name="shopping-basket" size={24} color="white" />
          <Text style={styles.textStyle}>View Cart</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
});

export default ViewCart;
