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
import GetNewPassword from "../../../../components/Auth/GetNewPassword";
import Header from "../../../../components/General/Header";
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.navigate("Settings")}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Enter new password" textSize={20} />
      </View>
      <GetNewPassword setIsLoading={setIsLoading} isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  container: { flex: 1, backgroundColor: Colors.bkg },
});

export default NewPasswordScreen;
