import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CardButton = ({ title, icon }) => {
  const navigation = useNavigation();

  return (
    <Card
      style={{
        width: "45%",
        height: "40%",
        elevation: 5,
        backgroundColor: Colors.bkg,
        marginVertical: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (title === "Settings") {
            navigation.navigate("Settings");
          }
        }}
        style={{
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <View>
          {title === "Personal Info" ? (
            <Feather name={icon} size={60} color="black" />
          ) : null}
          {title === "My Orders" ? (
            <MaterialCommunityIcons name={icon} size={60} color="black" />
          ) : null}
          {title === "Payments" ? (
            <MaterialIcons name="payment" size={60} color="black" />
          ) : null}
          {title === "Settings" ? (
            <Octicons name="settings" size={60} color="black" />
          ) : null}
          <Text style={{ textAlign: "center", alignItems: "center" }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default CardButton;
