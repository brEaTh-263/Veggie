import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const PaymentBar = () => {
  const navigation = useNavigation();
  const paymentMethod = useSelector((state) => state.Profile.paymentMethod);

  return (
    <View style={{ margin: 15 }}>
      <Text
        style={{
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        Payment
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("PaymentMethods")}
        style={{ borderWidth: 1.5, padding: 13, alignItems: "center" }}
      >
        {paymentMethod ? (
          <Text style={{ fontSize: 20, fontStyle: "italic" }}>
            {paymentMethod}
          </Text>
        ) : (
          <Text style={{ textTransform: "uppercase", fontSize: 18 }}>
            select
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PaymentBar;

const styles = StyleSheet.create({});
