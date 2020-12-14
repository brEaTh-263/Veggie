import React from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";

const FacebookSignIn = ({ isLoading, setIsLoading }) => {
  const signInWithFaceBookAsync = async () => {
    try {
      // PENDING!!!
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      Alert.alert("Something went wrong!", "Please try again", [
        {
          text: "Okay",
        },
      ]);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => signInWithFaceBookAsync()}>
        <Image
          source={require("../../../assets/facebook-icon.png")}
          style={{ width: 60, height: 60 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FacebookSignIn;
