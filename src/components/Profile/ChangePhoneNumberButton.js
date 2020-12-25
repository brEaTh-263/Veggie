import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PhoneNumber = ({ phoneNumber }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "700" }}>Phone Number</Text>
      <View style={styles.numberContainer}>
        <Text style={{ fontWeight: "700", fontSize: 18 }}>
          +91 | {phoneNumber}
        </Text>
        <Button
          mode="text"
          color={Colors.tertiary}
          onPress={() => {
            navigation.navigate("PhoneNumber", {
              checkOut: false,
            });
          }}
        >
          Change
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 20, marginVertical: 5 },
  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PhoneNumber;
