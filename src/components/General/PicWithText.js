import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Header";

const PicWithText = ({ children }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{ position: "absolute", top: 0, width: "100%", marginTop: 25 }}
      >
        <Header />
      </View>
      {children}
    </View>
  );
};

export default PicWithText;
