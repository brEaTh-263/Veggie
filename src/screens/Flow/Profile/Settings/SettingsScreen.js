import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-paper";
import BackButton from "../../../../components/General/BackButton";
import PlainCard from "../../../../components/General/PlainCard";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../../../../store/actions/Auth";
const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Settings" textSize={30} />
      </View>

      <PlainCard
        title="Change Password"
        subtitle="Some suggestion"
        // navScreen="ChangePassword"
      />
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
    marginTop: 35,
  },
});

export default SettingsScreen;
