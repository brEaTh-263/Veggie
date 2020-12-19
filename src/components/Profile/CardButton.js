import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const CardButton = ({ title, icon, navScreen }) => {
  const navigation = useNavigation();

  return (
    <Card style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navScreen);
        }}
        style={styles.cardStyle}
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

const styles = StyleSheet.create({
  cardContainer: {
    width: "45%",
    height: "40%",
    elevation: 5,
    backgroundColor: Colors.bkg,
    marginVertical: 5,
  },
  cardStyle: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default CardButton;
