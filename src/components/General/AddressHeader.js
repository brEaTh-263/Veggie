import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const AddressHeader = ({ setIsVisible, address }) => {
  let name = address.split(",")[0];

  useEffect(() => {
    if (name.length === 0) {
      name = "Your Location";
    }
  }, [name]);

  return (
    <TouchableOpacity
      onPress={() => setIsVisible(true)} //OPENS ChooseLocationTypeDialog
      style={{ marginTop: 10, marginHorizontal: 10, marginVertical: 15 }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <Entypo name="location-pin" size={28} color="black" />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontWeight: "bold", fontSize: 15 }}
        >
          {name}
        </Text>
      </View>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          color: "#888",
          marginHorizontal: 10,
          fontSize: 12,
        }}
      >
        {address}
      </Text>
    </TouchableOpacity>
  );
};

export default AddressHeader;
