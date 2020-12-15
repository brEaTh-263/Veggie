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
      style={{ marginTop: 30, marginHorizontal: 10, marginVertical: 15 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Entypo name="location-pin" size={28} color="black" />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontWeight: "bold", fontSize: 20, width: "70%" }}
        >
          {name}
        </Text>
      </View>

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ color: "#888", width: "70%", marginHorizontal: 10 }}
      >
        {address}
      </Text>
    </TouchableOpacity>
  );
};

export default AddressHeader;
