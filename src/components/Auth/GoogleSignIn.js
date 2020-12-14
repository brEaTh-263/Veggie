import React from "react";
import { View, Alert, Image, TouchableOpacity } from "react-native";

const GoogleSignInComponent = ({ isLoading, setIsLoading }) => {
  async function signInWithGoogleAsync() {
    try {
      //PENDING!!
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      Alert.alert("Something went wrong!", "Please try again", [
        {
          text: "Okay",
        },
      ]);
    }
  }
  return (
    <View>
      <TouchableOpacity onPress={() => signInWithGoogleAsync()}>
        <Image
          source={require("../../../assets/google-icon.png")}
          style={{ width: 60, height: 60 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignInComponent;
