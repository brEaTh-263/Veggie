import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import FacebookSignIn from "../../components/Auth/FacebookSignIn";
import GoogleSignIn from "../../components/Auth/GoogleSignIn";
import Colors from "../../constants/Colors";

const StartScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/backgroundLeaves.jpg")}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Veggiee!!</Text>
      </View>

      <View>
        <Text style={styles.questionStyle}>
          Do you already have an account?
        </Text>
        <Button
          color={Colors.primary}
          mode="contained"
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("SignIn")}
        >
          Log in
        </Button>
        <Button
          color={Colors.primary}
          mode="outlined"
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("SignUp")}
        >
          No,Sign up
        </Button>
      </View>
      <View>
        <Text style={styles.oAuthTitleStyle}>Sign In With</Text>
        <View style={styles.oAuthComponentContainerStyle}>
          <FacebookSignIn setIsLoading={setIsLoading} isLoading={isLoading} />
          <GoogleSignIn setIsLoading={setIsLoading} isLoading={isLoading} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#f9f0eb",
  },
  imageStyle: {
    width: "100%",
    height: "30%",
  },
  questionStyle: {
    textAlign: "center",
    margin: 20,
    fontSize: 18,
  },
  buttonStyle: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  oAuthTitleStyle: {
    textAlign: "center",
    fontSize: 20,
    margin: 20,
    marginTop: 40,
  },
  oAuthComponentContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default StartScreen;
