import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Controller } from "react-hook-form";

const GetExtraLocationDetails = ({ errors, control }) => {
  return (
    <View>
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
        defaultValue=""
      />
      {errors.building && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            This is required!
          </Text>
        </View>
      )}
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
        defaultValue=""
      />
      {errors.landmark && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Nearest landmark to you
          </Text>
        </View>
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
});

export default GetExtraLocationDetails;
