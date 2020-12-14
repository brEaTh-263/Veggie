import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const Eye = ({ visible }) => {
  return (
    <View>
      <Ionicons
        name={visible ? "md-eye" : "md-eye-off"}
        size={24}
        color={Colors.tertiary}
      />
    </View>
  );
};

export default Eye;
