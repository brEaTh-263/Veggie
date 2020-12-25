import React from "react";
import { View, Image, TouchableOpacity, Alert, Dimensions } from "react-native";

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
          style={{
            width: Dimensions.get("window").width / 6,
            height: Dimensions.get("window").height / 11,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FacebookSignIn;
