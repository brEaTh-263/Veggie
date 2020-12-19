import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../../../../constants/Colors";
import BackButton from "../../../../components/General/BackButton";
import GetNewPassword from "../../../../components/Auth/GetNewPasswordProfile";

const NewPasswordScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.tertiary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bkg }}>
      <View style={{ margin: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <BackButton style={{ marginVertical: 10 }} />
          <Text style={{ fontSize: 18, marginLeft: 15, fontWeight: "bold" }}>
            Enter new password
          </Text>
        </TouchableOpacity>
      </View>
      <GetNewPassword setIsLoading={setIsLoading} isLoading={isLoading} />
    </View>
  );
};

export default NewPasswordScreen;
