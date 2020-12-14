import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import Header from "../../components/General/Header";
import { useForm, Controller } from "react-hook-form";
import BackButton from "../../components/General/BackButton";
import Eye from "../../components/Auth/Eye";

const SignUpScreen = ({ navigation }) => {
  const { control, handleSubmit, errors, setError } = useForm();
  const [visible, setVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async (data) => {
    if (data.password !== data.repassword) {
      return setError("repassword", {});
    }
    try {
      //PENDING!!
    } catch (error) {
      setIsLoading(false);
      return setError("email", {
        types: {
          validate: "Please try another email..",
        },
      });
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      keyboardVerticalOffset={-200}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Start")}>
        <BackButton style={styles.backButtonStyle} />
      </TouchableOpacity>

      <Header
        text="Create new account"
        style={{ marginHorizontal: 15, marginTop: 5 }}
        textSize={30}
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="@username"
            />
          </View>
        )}
        name="username"
        rules={{ required: true, minLength: 3 }}
        defaultValue=""
      />

      {errors.username && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Must be 3 letters or more..
          </Text>
        </View>
      )}

      <Controller //CHECK FOR EMAIL REGEX
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="email@gmail.com"
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

      {errors.email && !errors.email.types && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            You must provide a valid email address
          </Text>
        </View>
      )}

      {errors.email && errors.email.types && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            {errors.email.types.validate}
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
            Must be 6 letters or more
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
              placeholder="Confirm password"
              secureTextEntry={!visible}
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

      <View style={{ margin: 10, marginLeft: 20 }}>
        <Text>
          By signing up,you accept the{" "}
          <Text style={styles.servicesAndPrivacyTextStyle}>
            Terms of Service
          </Text>
          {"  "}and{" "}
          <Text style={styles.servicesAndPrivacyTextStyle}>Privacy Policy</Text>
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          color={Colors.tertiary}
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          Sign Up
        </Button>
      </View>
      <View style={styles.signInContainerStyle}>
        <Text>
          Already have an account?
          <Text
            style={{ color: Colors.tertiary }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: {
    marginTop: 25,
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  eyeStyle: { position: "absolute", right: "5%" },
  inputContainer: {
    borderRadius: 30,
    overflow: "hidden",
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
  passwordContainerStyle: {
    borderRadius: 30,
    overflow: "hidden",
    margin: 10,
    marginTop: 15,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  servicesAndPrivacyTextStyle: { color: Colors.tertiary, fontWeight: "bold" },
  signInContainerStyle: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
});

export default SignUpScreen;
