import React from "react";
import { Button, Divider } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import AddressName from "../General/AddressName";
import { useSelector } from "react-redux";

const CheckOut = ({ amount, setIsVisible }) => {
  const address = useSelector(
    (state) => state.Profile.selectedLocation.address
  );
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            paddingLeft: 10,
            marginVertical: 10,
          }}
        >
          <AddressName address={address} />
        </View>
        <Button
          style={styles.changeButtonStyle}
          color={Colors.tertiary}
          onPress={() => {
            setIsVisible(true);
          }}
        >
          Change
        </Button>
      </View>
      <Divider />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "50%",
            // justifyContent: "center",
            paddingHorizontal: 15,
          }}
        >
          <FontAwesome name="rupee" size={18} color="black" />
          <Text style={{ fontSize: 20 }}>{amount}.00</Text>
        </View>

        <Button
          color={Colors.tertiary}
          mode="contained"
          style={{ width: "50%" }}
        >
          Proceed to pay
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  changeButtonStyle: { right: "20%", top: "5%" },
  container: { borderTopWidth: 1, borderTopColor: "#888" },
});

export default CheckOut;
