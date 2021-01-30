import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Bill = ({ price }) => {
  return (
    <View style={{ margin: 15, backgroundColor: "#a9d4b8", padding: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18 }}>Delivery</Text>
        <Text style={{ fontSize: 18 }}>$ 29.99</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 25,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Total
        </Text>
        <Text style={{ fontSize: 18 }}>$ {(price * 1 + 29.99).toFixed(2)}</Text>
      </View>
      <Text style={{ alignSelf: "flex-end", color: "black" }}>
        * GST included
      </Text>
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({});
