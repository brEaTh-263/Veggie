import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import DP from "../../../components/Profile/DP";
import CardButton from "../../../components/Profile/CardButton";
import NotAuthenticated from "../../../components/Profile/NotAuthenticated";
import { Ionicons } from "@expo/vector-icons";
const ProfileScreen = ({ navigation }) => {
  const profileData = useSelector((state) => state.Profile);
  const [image, setImage] = useState(`${profileData.imageURL}`);
  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    setImage(`${profileData.imageURL}`);
  }, [profileData, setImage]);

  if (token.length === 0) {
    return <NotAuthenticated />;
  }
  0;

  return (
    <View style={styles.container} centerContent={true}>
      <ScrollView>
        <TouchableOpacity
          style={{ position: "absolute", top: "5%", right: "5%" }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-sharp" size={24} color="black" />
        </TouchableOpacity>
        <DP username={profileData.username} image={image} canEdit={false} />
        <View style={{ height: 100 }} />
        <View style={styles.cardsContainer}>
          <CardButton title="Account" color="#cd3a45" navScreen="EditProfile" />
          <CardButton title="Payments" color="#0bb1aa" />
          <CardButton title="My Orders" color="#006b80" />
          <CardButton title="Addresses" navScreen="Address" color="#daa099" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bookmarkTitle: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  infoContainer: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    height: 320,
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bookmarkIconContainer: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
