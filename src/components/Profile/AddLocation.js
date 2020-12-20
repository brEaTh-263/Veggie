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
      <Entypo name="plus" size={26} color={Colors.sub} />
      <Text style={styles.title}>ADD NEW ADDRESS</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    marginTop: 20,
    // borderBottomColor: "#888",
    borderWidth: 0.5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    marginHorizontal: 10,
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default AddLocation;
