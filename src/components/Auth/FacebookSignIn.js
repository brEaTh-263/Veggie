import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  Text,
} from "react-native";
import Colors from "../../constants/Colors";

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
    <View style={{ width: "43%", marginRight: 15 }}>
      <TouchableOpacity
        onPress={() => signInWithFaceBookAsync()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          padding: 10,
          borderColor: Colors.primary,
          paddingHorizontal: 15,
          borderRadius: 10,
        }}
      >
        <Image
          source={require("../../../assets/facebookIcon.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FacebookSignIn;
