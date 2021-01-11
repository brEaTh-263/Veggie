import React from "react";
import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

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
    <View style={{ width: "43%" }}>
      <TouchableOpacity
        onPress={() => signInWithGoogleAsync()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Image
          source={require("../../../assets/googleIcon.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: "bold" }}>
          Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignInComponent;
