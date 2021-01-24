import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ToastAndroid } from "react-native";
import { Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const GetExtraLocationDetails = ({ errors, control, editAddress }) => {
  let name, landmark, restAddress;
  if (editAddress) {
    name = editAddress.address.split(",")[0];
    landmark = editAddress.address.split(",")[1];
    restAddress = editAddress.address.split(",")[2];
    restAddress = editAddress.address.slice(
      editAddress.address.indexOf(restAddress)
    );
  }
  const showInvalidInputToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  useEffect(() => {
    errors.building
      ? showInvalidInputToast("Please enter the required details")
      : errors.landmark
      ? showInvalidInputToast("Please enter the required details")
      : null;
  }, [errors]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Flat/House No/Building*</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Flat/House No/Building"
            />
          </View>
        )}
        name="building"
        rules={{
          required: true,
        }}
        defaultValue={editAddress ? name : ""}
      />

      <Text style={styles.title}>Nearest landmark*</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Landmark"
            />
          </View>
        )}
        name="landmark"
        rules={{
          required: true,
        }}
        defaultValue={editAddress ? landmark : ""}
      />

      {editAddress && (
        <>
          <View style={styles.inputContainer}>
            <Text style={{ fontStyle: "italic", fontSize: 18 }}>
              {restAddress}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginHorizontal: 20,
              bottom: "20%",
              position: "absolute",
            }}
          >
            <AntDesign name="exclamationcircleo" size={24} color="black" />
            <Text
              style={{
                width: "90%",
                marginHorizontal: 10,
                fontSize: 14,
              }}
            >
              If you want to edit the whole address,kindly add a new one
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15,
    marginTop: 15,
  },
  input: {
    color: "black",
    fontSize: 16,
    borderBottomWidth: 1,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 15,
    marginTop: 0,
  },
  title: {
    marginHorizontal: 15,
    fontStyle: "italic",
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default GetExtraLocationDetails;
