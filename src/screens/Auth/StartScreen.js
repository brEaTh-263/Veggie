import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
} from "react-native";
import { ActivityIndicator, Button, Snackbar } from "react-native-paper";
import FacebookSignIn from "../../components/Auth/FacebookSignIn";
import GoogleSignIn from "../../components/Auth/GoogleSignIn";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/Auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const StartScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onToggleSnackBar = () => {
    setVisible(!visible);
  };

  const onDismissSnackbar = () => {
    setVisible(false);
  };

  const onSubmit = async ({ phoneNumber }) => {
    try {
      setIsLoading(true);
      await dispatch(authActions.signInUsingPhoneNumber(phoneNumber));
      setIsLoading(false);
      navigation.navigate("OTPPhoneNumber", {
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      setIsLoading(false);
      return Alert.alert("Something went wrong");
    }
  };

  useEffect(() => {
    errors.phoneNumber ? onToggleSnackBar() : null;
  }, [errors]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ImageBackground
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      source={require("../../../assets/AuthBackground.jpeg")}
    >
      <Button
        color={Colors.tertiary}
        compact={true}
        onPress={() => {
          dispatch(authActions.skipAuthentication());
        }}
        style={styles.skipButtonStyle}
      >
        <Text style={{ fontSize: 10 }}>Skip</Text>
      </Button>
      <View style={styles.container}>
        <View style={{ height: "15%" }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 50, marginBottom: 15, fontFamily: "logo" }}>
            Organic
          </Text>
        </View>
        <View style={styles.inputContainerStyle}>
          <Image
            style={styles.flagStyle}
            source={require("../../../assets/flag.jpg")}
          />
          <Text style={styles.prefixStyle}>+91 |</Text>

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="Phone Number"
                place
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                keyboardType="phone-pad"
                value={value}
                textContentType="telephoneNumber"
                style={styles.inputStyle}
              />
            )}
            name="phoneNumber"
            rules={{
              required: true,
              minLength: 10,
              maxLength: 10,
              pattern: /^\d+$/,
            }}
            defaultValue=""
          />
        </View>

        <Button
          mode="contained"
          color={Colors.primary}
          onPress={handleSubmit(onSubmit)}
          contentStyle={{ justifyContent: "center", paddingVertical: 7 }}
          style={{
            borderRadius: 10,
            width: "90%",
            alignSelf: "center",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 17 }}> Send OTP</Text>
        </Button>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#888" }} />
          <View>
            <Text style={{ width: 30, textAlign: "center", color: "#888" }}>
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "#888" }} />
        </View>
        <View style={{ marginVertical: 10 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.emailContainerStyle}
        >
          <MaterialIcons name="email" size={28} color="black" />
          <Text style={styles.emailTextStyle}> Continue with Email</Text>
        </TouchableOpacity>

        <View style={styles.oAuthComponentContainerStyle}>
          <FacebookSignIn setIsLoading={setIsLoading} isLoading={isLoading} />
          <GoogleSignIn setIsLoading={setIsLoading} isLoading={isLoading} />
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Text style={{ textAlign: "center", fontStyle: "italic" }}>
            By signing up,you accept the{" "}
            <Text style={styles.servicesAndPrivacyTextStyle}>
              Terms of Service
            </Text>
            {"  "}and{" "}
            <Text style={styles.servicesAndPrivacyTextStyle}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackbar}
        duration={3000}
        style={{
          borderRadius: 30,
          backgroundColor: "#888",
        }}
      >
        <Text style={{ color: "black" }}>Please give a valid number</Text>
      </Snackbar>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "90%",
    borderRadius: 20,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  imageStyle: {
    width: "100%",
    height: SCREEN_HEIGHT / 3.5,
  },
  oAuthTitleStyle: {
    textAlign: "center",
    fontSize: 20,
    margin: 20,
    marginTop: 20,
  },
  oAuthComponentContainerStyle: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",

    alignItems: "center",
  },
  inputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    width: "90%",
    height: SCREEN_HEIGHT / 13,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  flagStyle: {
    width: 25,
    height: 18,
    borderRadius: 5,
    overflow: "hidden",
    marginLeft: 15,
  },
  prefixStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputStyle: {
    width: "60%",
    height: 60,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  emailContainerStyle: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: SCREEN_HEIGHT / 13,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  emailTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 25,
  },
  servicesAndPrivacyTextStyle: {
    color: Colors.tertiary,
    fontWeight: "bold",
  },
  skipButtonStyle: {
    position: "absolute",
    right: "2%",
    top: "5%",
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
    opacity: 0.7,
  },
});

export default StartScreen;
