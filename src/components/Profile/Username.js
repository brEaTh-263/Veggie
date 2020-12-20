import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { TextInput } from "react-native-paper";

const Username = ({ control, errors }) => {
  const profileData = useSelector((state) => state.Profile);
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
              theme={{ colors: { primary: "green" } }}
              label="Username"
            />
          </View>
        )}
        name="userName"
        rules={{
          required: true,
          minLength: 3,
          maxLength: 20,
        }}
        defaultValue={profileData.username}
      />
      {errors.userName && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            This is required!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    opacity: 1,
    margin: 10,
    marginTop: 15,
    height: 60,
  },
  buttonContainer: {
    borderRadius: 30,
    overflow: "hidden",
    margin: 20,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 15,
  },
  input: {
    color: "black",
    fontSize: 18,
    borderBottomWidth: 1,
    backgroundColor: Colors.bkg,
  },
});

export default Username;
