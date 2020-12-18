import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import Header from "../../components/General/Header";
import BackButton from "../../components/General/BackButton";
import Eye from "../../components/Auth/Eye";
import * as authActions from "../../store/actions/Auth";
import { useDispatch } from "react-redux";

const SignInScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        await dispatch(authActions.signInDefault(data.email, data.password));
      } catch (error) {
        setIsLoading(false);
        return Alert.alert("Invalid", "Email or password is incorrect", [
          {
            text: "Okay",
          },
        ]);
      }
    },
    [setIsLoading, setVisible, isLoading]
  );

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.container}
      behavior="padding"
      keyboardVerticalOffset={20}
    >
      <View style={styles.backButtonStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("Start")}>
          <BackButton />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.imageStyle}
        />
        <Header text="Welcome!" textSize={30} />
      </View>
      <View style={{ height: "5%" }}></View>
      <Controller //CHECK FOR EMAIL REGEX!!
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="email@gmail.com"
              underlineColor="white"
            />
          </View>
        )}
        name="email"
        rules={{
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }}
        defaultValue=""
      />
      {errors.email && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            You must provide a valid email address
          </Text>
        </View>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.passwordContainerStyle}>
            <TextInput
              style={{ width: "100%" }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Password"
              secureTextEntry={!visible}
              underlineColor="white"
            />
            <TouchableOpacity
              onPress={() => {
                setVisible(!visible);
              }}
              style={styles.eyeStyle}
            >
              <Eye visible={visible} setVisible={setVisible} />
            </TouchableOpacity>
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
            Please provide a valid password
          </Text>
        </View>
      )}

      <View style={{ alignItems: "flex-end", marginHorizontal: 50 }}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={{ color: "black" }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          loading={isLoading}
          color={Colors.primary}
          onPress={handleSubmit(onSubmit)}
        >
          Log In
        </Button>
      </View>
      <View style={styles.signUpContainer}>
        <Text>
          Don't have an account?
          <Text
            style={{ color: Colors.secondary }}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: { position: "absolute", marginLeft: 15, marginTop: 20 },
  buttonContainer: {
    borderRadius: 30,
    overflow: "hidden",
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 15,
  },
  eyeStyle: {
    position: "absolute",
    right: "5%",
  },
  imageContainer: {
    alignItems: "center",
    width: "100%",
    height: "40%",
    marginTop: 25,
    // borderWidth: 1,
    justifyContent: "center",
  },
  imageStyle: { width: "100%", height: "80%" },
  inputContainer: {
    borderRadius: 30,
    overflow: "hidden",
    margin: 10,
    marginTop: 15,
    height: 60,
  },
  passwordContainerStyle: {
    borderRadius: 30,
    overflow: "hidden",
    margin: 10,
    marginTop: 15,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  signUpContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
});

export default SignInScreen;
