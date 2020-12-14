import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = (props) => {
  return (
    <View {...props}>
      <Text
        style={{
          fontSize: props.textSize,

          fontWeight: "bold",
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default Header;
