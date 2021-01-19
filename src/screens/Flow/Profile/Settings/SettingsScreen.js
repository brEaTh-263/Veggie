import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-paper";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../../../../store/actions/Auth";
const SettingsScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header text="Settings" />
      </View>

      <Button
        icon="power"
        color={Colors.tertiary}
        onPress={async () => {
          dispatch(authActions.log_out());
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Log Out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
});

export default SettingsScreen;
