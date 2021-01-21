import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AddressBar = ({ profileData }) => {
  let date = new Date();
  let address = profileData.selectedLocation.address.split(",");
  let country = address[address.length - 1].trim("");
  let state = address[address.length - 2].trim("");
  let otherDetails = profileData.selectedLocation.address.replace(state, "");
  let xotherDetails = otherDetails.replace(`,${country},`, "");

  return (
    <View style={{ margin: 15 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Delivery
        </Text>
        <Text
          style={{
            //   fontWeight: "bold",
            fontSize: 18,
          }}
        >
          $29.99
        </Text>
      </View>

      <View style={{ borderWidth: 1, padding: 10, borderWidth: 1.5 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Day</Text>
        <Text style={{ fontSize: 16 }}>{date.toDateString()}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {profileData.username}
        </Text>

        <Text style={{ fontSize: 16 }}>{xotherDetails}</Text>
        <Text style={{ fontSize: 16 }}>{state}</Text>

        <Text style={{ fontSize: 16 }}>{country}</Text>
        <Text style={{ fontSize: 16 }}>{profileData.phoneNumber}</Text>
      </View>
    </View>
  );
};

export default AddressBar;

const styles = StyleSheet.create({});
