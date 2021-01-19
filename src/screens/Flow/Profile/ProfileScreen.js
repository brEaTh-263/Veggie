import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import DP from "../../../components/Profile/DP";
import CardButton from "../../../components/Profile/CardButton";
import NotAuthenticated from "../../../components/Profile/NotAuthenticated";

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
      <DP username={profileData.username} image={image} canEdit={false} />
      <View style={{ height: "15%" }} />
      <View style={styles.cardsContainer}>
        <CardButton
          title="Personal Info"
          color="#00F071"
          navScreen="EditProfile"
        />
        <CardButton title="Payments" color="#533CF0" />
        <CardButton title="My Orders" color="#F05C48" />
        <CardButton title="My Addresses" navScreen="Address" color="#F0745B" />
      </View>
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
    backgroundColor: Colors.bkg,
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
