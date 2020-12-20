import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const AddLocation = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AddAddress", {
          newAddress: "",
        });
      }}
      style={styles.container}
    >
      <Entypo name="plus" size={26} color={Colors.primary} />
      <Text style={styles.title}>ADD ADDRESS</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBottomColor: "#888",
    borderBottomWidth: 0.3,
  },
  title: { fontSize: 16, marginHorizontal: 10, color: Colors.primary },
});

export default AddLocation;
