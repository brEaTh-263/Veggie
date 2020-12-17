import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const AddressName = ({ address, addressLoading }) => {
  const title = address.split(",")[1];
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Entypo name="location" size={26} color="black" />

        <Text
          style={{ fontSize: 20, fontWeight: "bold", width: "70%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {addressLoading ? "Locating..." : title}
        </Text>
      </View>
      <Text
        style={{ marginTop: 5, fontStyle: "italic" }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {address}
      </Text>
    </View>
  );
};

export default AddressName;
