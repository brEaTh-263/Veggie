import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Octicons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const RecipeIcons = ({ mode, difficulty, time }) => {
  if (mode === "Non-Veg") {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Octicons
          name="primitive-dot"
          size={20}
          color="red"
          style={{
            borderWidth: 1,
            paddingHorizontal: 2,
            paddingLeft: 4,
          }}
        />
        <Text style={styles.textStyle}>Non-Veg</Text>
      </View>
    );
  }
  if (mode === "Vegetarian") {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Octicons
          name="primitive-dot"
          size={20}
          color="green"
          style={{
            borderWidth: 1,
            paddingHorizontal: 2,
            paddingLeft: 4,
          }}
        />
        <Text style={styles.textStyle}>Vegetarian</Text>
      </View>
    );
  }
  if (mode === "Egg") {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome5 name="egg" size={20} color="#ffab91" />
        <Text style={styles.textStyle}>Egg</Text>
      </View>
    );
  }
  if (mode === "Vegan") {
    return (
      <View>
        <FontAwesome5 name="egg" size={20} color="#ffab91" />
        <Text style={styles.textStyle}>Vegan</Text>
      </View>
    );
  }
  if (difficulty === "Easy" || difficulty === "Medium" || difficulty === "Hard")
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          name="chef-hat"
          size={20}
          color="#fff"
          style={{
            backgroundColor: Colors.secondary,
            padding: 3,
            borderRadius: 15,
          }}
        />
        <Text style={styles.textStyle}>{difficulty}</Text>
      </View>
    );
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <AntDesign name="clockcircleo" size={20} color="black" />
      <Text style={styles.textStyle}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 13,
    marginLeft: 5,
  },
});

export default RecipeIcons;
