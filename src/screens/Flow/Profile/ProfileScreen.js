import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "../../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import DP from "../../../components/Profile/DP";
import ProductItem from "../../../components/General/ProductItem";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import CardButton from "../../../components/Profile/CardButton";
import Header from "../../../components/General/Header";
import * as authActions from "../../../store/actions/Auth";
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

  return (
    <View style={styles.container} centerContent={true}>
      <DP username={profileData.username} image={image} canEdit={false} />

      <View style={{ marginVertical: 10, marginTop: 80 }}>
        <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>
          Account Details
        </Text>
      </View>
      <View style={styles.cardsContainer}>
        <CardButton
          title="Personal Info"
          icon="user"
          navScreen="PersonalInfo"
        />
        <CardButton title="Payments" icon="credit-card-settings-outline" />
        <CardButton title="My Orders" icon="pencil-outline" />
        <CardButton title="Settings" icon="settings" navScreen="Settings" />
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
    height: 280,
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
