import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView, View } from "react-native";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";
import BackButton from "../../../../components/General/BackButton";
import PlainCard from "../../../../components/General/PlainCard";
const PersonalInfoScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.navigate("Profile")}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Personal Info" textSize={30} />
      </View>

      <PlainCard
        title="Edit Profile"
        subtitle="Edit your profile picture,username or phone number.."
        navScreen="EditProfile"
      />
      <PlainCard
        title="My Address Book"
        subtitle="Add or delete address"
        navScreen="Address"
      />
    </ScrollView>
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

export default PersonalInfoScreen;
