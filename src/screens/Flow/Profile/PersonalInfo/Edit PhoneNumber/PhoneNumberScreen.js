import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import Colors from "../../../../../constants/Colors";
import { TouchableOpacity } from "react-native";
import BackButton from "../../../../../components/General/BackButton";
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../../../../../store/actions/Profile";
import Header from "../../../../../components/General/Header";

const PhoneNumberScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);
  const profileData = useSelector((state) => state.Profile);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(
        profileActions.getOTPForNewPhoneNumber(data.phoneNumber, token)
      );
      setIsLoading(false);
      navigation.navigate("OTP", { newPhoneNumber: data.phoneNumber });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return Alert.alert("Something went wrong", "Please try again!", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bkg }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Enter phone number" textSize={20} />
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Text style={styles.title}>
          Enter new phone number and we'll send and "OTP" for authentication
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <Text style={{ fontWeight: "700", fontSize: 18 }}>+91</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={{ borderBottomWidth: 0.5, fontSize: 18 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  keyboardType="phone-pad"
                  value={value}
                  textContentType="telephoneNumber"
                />
              </View>
            )}
            name="phoneNumber"
            rules={{
              required: true,
              minLength: 10,
              maxLength: 10,
              pattern: /^\d+$/,
            }}
            defaultValue={profileData.phoneNumber}
          />
          {errors.phoneNumber && (
            <View style={styles.errorMessage}>
              <Text style={{ color: "red", fontWeight: "bold" }}>
                This is required!
              </Text>
            </View>
          )}
        </View>
      </View>

      <Button
        mode="contained"
        color={Colors.tertiary}
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonStyle}
      >
        Get OTP
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginLeft: 15,
    width: "80%",
    flexDirection: "column",
    // marginTop: 20,
  },
  buttonStyle: {
    position: "absolute",
    bottom: 0,
    width: "95%",
    borderRadius: 5,
    paddingVertical: 7,
    margin: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  title: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 16,
    marginTop: 30,
  },
});

export default PhoneNumberScreen;
