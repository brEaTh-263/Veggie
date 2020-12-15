import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
const AddressInBullet = ({ value, setValue }) => {
  const addresses = useSelector((state) => state.Profile.locations);

  const getAllAddress = () => {
    return addresses.map((address) => {
      return (
        <View style={styles.SingleAddress} key={address._id}>
          <RadioButton value={address._id} />
          <Text
            style={styles.addressText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {address.address}
          </Text>
        </View>
      );
    });
  };
  return (
    <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
      {getAllAddress()}
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  SingleAddress: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
    alignItems: "center",
  },
  addressText: {
    margin: 10,
    fontSize: 16,
    fontStyle: "italic",
    paddingRight: 10,
  },
});

export default AddressInBullet;
