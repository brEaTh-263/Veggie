import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/actions/Profile";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const GetNewPassword = ({ isLoading, setIsLoading }) => {
  const { control, handleSubmit, errors, setError, reset } = useForm();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);
  const navigation = useNavigation();
  const getNewPassword = useCallback(
    async ({ password, repassword }) => {
      if (password !== repassword) {
        return setError("repassword", {
          shouldFocus: true,
        });
      }
      try {
        setIsLoading(true);
        await dispatch(profileActions.newPassword(password, token));
        navigation.navigate("Settings");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        return Alert.alert("Something went wrong", "Please try again!", [
          { text: "Okay" },
        ]);
      }
    },
    [setIsLoading, dispatch]
  );

  return (
    <View style={{ flex: 1 }}>
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
              placeholder="Password"
              mode="flat"
              underlineColor="white"
              secureTextEntry={true}
            />
          </View>
        )}
        name="password"
        rules={{
          required: true,
          minLength: 6,
          maxLength: 20,
        }}
        defaultValue=""
      />
      {errors.password && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Password length must be greater than 5 and less than 20
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
              theme={{ colors: { primary: "green" } }}
              placeholder="Re-Type Password"
              mode="flat"
              underlineColor="white"
              secureTextEntry={true}
            />
          </View>
        )}
        name="repassword"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.repassword && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Password doesn't match
          </Text>
        </View>
      )}

      <Button
        color={Colors.tertiary}
        style={styles.buttonStyle}
        onPress={handleSubmit(getNewPassword)}
        mode="contained"
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    opacity: 1,
    marginHorizontal: 20,
    marginTop: 15,
    height: 60,
  },
  buttonStyle: {
    bottom: 0,
    width: "95%",
    position: "absolute",
    paddingVertical: 10,
    margin: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    color: "black",
    fontSize: 18,
    borderBottomWidth: 1,
    backgroundColor: Colors.bkg,
  },
});

export default GetNewPassword;
