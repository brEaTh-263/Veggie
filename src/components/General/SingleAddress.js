import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import * as profileActions from "../../store/actions/Profile";
import { useDispatch, useSelector } from "react-redux";
import { Card, Title, Paragraph } from "react-native-paper";
import fonts from "../../constants/fonts";
import Colors from "../../constants/Colors";
const SingleAddress = ({
  address,
  _id,
  setIsLoading,
  setEditAddress,
  latitude,
  longitude,
}) => {
  const token = useSelector((state) => state.Profile.token);
  const dispatch = useDispatch();

  const delAddress = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(profileActions.deleteAddress(_id, token));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return Alert.alert("Something went wrong!", "Please try again!", [
        { text: "Okay" },
      ]);
    }
  }, []);

  const name = address.split(",")[0];
  const landmark = address.split(",")[1];
  let restAddress = address.split(",")[2];
  restAddress = address.slice(address.indexOf(restAddress));

  return (
    <Card style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={{ zIndex: 1 }}
          onPress={() => {
            setEditAddress({
              _id: _id,
              address: address,
              longitude: longitude,
              latitude: latitude,
            });
          }}
        >
          <EvilIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 10 }}>|</Text>
        <TouchableOpacity
          style={{ zIndex: 1 }}
          onPress={() => {
            Alert.alert(
              "Are you sure you want to delete this address",
              "Please confirm",
              [{ text: "Yes", onPress: delAddress }, { text: "No" }]
            );
          }}
        >
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Card.Content>
        <Title style={{ color: "black", fontFamily: fonts.Bold }}>{name}</Title>
        <Paragraph style={{ fontSize: 16 }}>{landmark}</Paragraph>
        <Paragraph style={{ fontStyle: "italic" }}>{restAddress}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginHorizontal: 10,
    backgroundColor: "white",
    marginVertical: 10,
    elevation: 5,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SingleAddress;
