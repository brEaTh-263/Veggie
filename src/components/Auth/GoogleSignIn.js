import React from "react";
import { View, Alert, Image, TouchableOpacity, Dimensions } from "react-native";

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
          style={{
            width: Dimensions.get("window").width / 6,
            height: Dimensions.get("window").height / 11,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignInComponent;
