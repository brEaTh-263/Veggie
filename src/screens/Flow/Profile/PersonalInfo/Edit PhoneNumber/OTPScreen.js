import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../../../../constants/Colors";
import BackButton from "../../../../../components/General/BackButton";
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../../../../../store/actions/Profile";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Header from "../../../../../components/General/Header";
import * as authActions from "../../../../../store/actions/Auth";

const OTPScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const token = useSelector((state) => state.Auth.token);
  const { newPhoneNumber, checkOut } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((state) => state.Cart);

  const getOtp = useCallback(async () => {
    try {
      if (checkOut && !token) {
        dispatch(authActions.signInUsingPhoneNumber(data.phoneNumber));
      } else {
        dispatch(profileActions.getOTPForNewPhoneNumber(newPhoneNumber, token));
      }
    } catch (error) {
      return Alert.alert("Something went wrong", "Please try again!", [
        { text: "Okay" },
      ]);
    }
  }, [dispatch]);

  const verifyOtp = useCallback(
    async (code) => {
      try {
        if (!code) {
          throw new Error();
        }
        setIsLoading(true);
        if (checkOut && !token) {
          await dispatch(
            profileActions.addTokenAndOverwriteCartProducts(
              newPhoneNumber,
              code,
              cart.cartProducts,
              cart.totalAmounts
            )
          );
        } else {
          await dispatch(
            profileActions.verifyOTPAndSaveNewPhoneNumber(
              newPhoneNumber,
              code,
              token
            )
          );
        }

        setIsLoading(false);
        if (checkOut) {
          navigation.push("Cart");
        } else {
          navigation.navigate("EditProfile");
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        return Alert.alert("Invalid OTP", "Please try again", [
          { text: "Okay" },
        ]);
      }
    },
    [dispatch, setIsLoading]
  );

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.tertiary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header text="Enter the code" textSize={20} />
      </View>
      <View style={{ margin: 20 }}>
        <Text style={styles.title}>
          We've sent a verification code to {"                              "}
          +91 | {newPhoneNumber}
        </Text>
      </View>
      <View style={styles.otpContainerStyle}>
        <OTPInputView
          style={styles.otpStyle}
          pinCount={6}
          code={otp}
          onCodeChanged={(code) => setOtp(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.inputFieldStyle}
          codeInputHighlightStyle={{}}
          onCodeFilled={verifyOtp}
        ></OTPInputView>
      </View>
      <View style={styles.noOtpContainerStyle}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          Didn't get an OTP?{" "}
          <Text style={{ color: Colors.tertiary }} onPress={getOtp}>
            Resend now
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bkg },
  inputContainer: {
    marginLeft: 15,
    width: "80%",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 16,
    marginTop: 30,
  },
  otpContainerStyle: { height: 50, width: "100%" },
  otpStyle: {
    width: "90%",
    height: 50,
    alignItems: "center",
    marginHorizontal: 20,
  },
  inputFieldStyle: {
    color: "black",
    fontWeight: "bold",
    borderWidth: 2,
  },
  noOtpContainerStyle: {
    position: "absolute",
    bottom: 0,
    marginBottom: 15,
    alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
});

export default OTPScreen;
