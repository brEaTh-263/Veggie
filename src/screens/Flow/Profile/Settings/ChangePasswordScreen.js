import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../../constants/Colors";
import * as profileActions from "../../../../store/actions/Profile";

const ChangePasswordScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.Profile.token);
  const oAuth = useSelector((state) => state.Auth.oAuth);
  const { control, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onsubmit = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(
        profileActions.checkValidityOfPassword(data.password, token)
      );
      navigation.navigate("NewPassword");
    } catch (error) {
      setIsLoading(false);
      return Alert.alert("Invalid Password", "Please try again", [
        { text: "Okay" },
      ]);
    }
  };

  if (oAuth) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <BackButton style={{ marginTop: 30, marginHorizontal: 15 }} />
        </TouchableOpacity>
        <View style={styles.centered}>
          <Image
            source={require("../../../../../assets/leaves.png")}
            style={{ height: "30%", width: "40%", borderWidth: 1 }}
            resizeMode="center"
          />
          <Text style={styles.oAuthTitleStyle}>
            Sorry,You have logged in through google or facebook.We don't manage
            your password!
          </Text>
        </View>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.tertiary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Enter current password" textSize={20} />
      </View>
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
              secureTextEntry={true}
              underlineColor="white"
            />
          </View>
        )}
        name="password"
        rules={{
          required: true,
        }}
        defaultValue=""
      />
      {errors.password && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Please enter a valid password
          </Text>
        </View>
      )}

      <Button
        color={Colors.tertiary}
        style={styles.buttonStyle}
        onPress={handleSubmit(onsubmit)}
        mode="contained"
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    opacity: 1,
    margin: 10,
    marginTop: 15,
    height: 60,
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  oAuthTitleStyle: {
    textAlign: "center",
    fontSize: 18,
    fontStyle: "italic",
    color: "#888",
    marginHorizontal: 10,
  },
  buttonStyle: {
    bottom: 0,
    width: "95%",
    position: "absolute",
    paddingVertical: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default ChangePasswordScreen;
