import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions,
  Text,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import Header from "../../components/General/Header";
import { useDispatch } from "react-redux";
import BackButton from "../../components/General/BackButton";
import * as authActions from "../../store/actions/Auth";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const ForgotPasswordScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors, setError, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(authActions.getPhoneNumberFromEmail(data.email));
      setIsLoading(false);
      navigation.navigate("OTP");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return Alert.alert("Something went wrong", "Please try again!", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.bkg, flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() => navigation.goBack()}
          >
            <BackButton />
          </TouchableOpacity>
          <Header text="Forgot password?" textSize={25} />
        </View>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            source={require("../../../assets/question-1.png")}
            style={{ width: "50%", height: "100%" }}
          />
        </View>

        <Text style={styles.emailHeaderStyle}>
          Enter the email you last remember..
        </Text>
        <Controller //CHECK FOR EMAIL REGEX
          control={control}
          render={({ onChange, onBlur, value }) => (
            <View style={styles.inputContainer}>
              <TextInput
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
        {errors.email && (
          <View style={styles.errorMessage}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              You must provide a valid email address
            </Text>
          </View>
        )}
      </View>
      <Button
        color={Colors.primary}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      >
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: { marginTop: 30, marginLeft: 15 },
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2.5,
    alignItems: "center",
  },
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
  emailHeaderStyle: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15,
    fontStyle: "italic",
  },
  headerStyle: { marginLeft: 15, marginTop: 15 },
});

export default ForgotPasswordScreen;
