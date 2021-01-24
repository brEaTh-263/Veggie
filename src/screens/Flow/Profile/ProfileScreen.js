import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import Options from "../../../components/Profile/Options";
import NotAuthenticated from "../../../components/Profile/NotAuthenticated";
import Header from "../../../components/General/Header";
import fonts from "../../../constants/fonts";
import { FontAwesome } from "@expo/vector-icons";
const ProfileScreen = () => {
  const profileData = useSelector((state) => state.Profile);
  const [image, setImage] = useState(`${profileData.imageURL}`);
  const token = useSelector((state) => state.Auth.token);
  const callCustomerCare = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:9415512044`;
    } else {
      phoneNumber = `telprompt:9415512044`;
    }

    Linking.openURL(phoneNumber);
  };
  useEffect(() => {
    setImage(`${profileData.imageURL}`);
  }, [profileData, setImage]);

  if (token.length === 0) {
    return <NotAuthenticated />;
  }

  return (
    <View style={styles.container} centerContent={true}>
      <ScrollView>
        <Header text="Profile" />
        <TouchableOpacity
          style={{ position: "absolute", top: "3%", right: "5%" }}
          onPress={() => callCustomerCare()}
        >
          <FontAwesome name="phone" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            margin: 10,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: 80, height: 80, borderRadius: 15 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.nameStyle}>{profileData.username}</Text>
            {profileData.email && <Text>{profileData.email}</Text>}
            {profileData.phoneNumber.length === 10 && (
              <Text> +91 {profileData.phoneNumber}</Text>
            )}
          </View>
        </View>
        <View style={styles.cardsContainer}>
          <Options
            title="Account"
            color="#22ae7a"
            iconName="person-outline"
            navigateTo="EditProfile"
          />
          <Options title="Payments" color="#83ae21" iconName="wallet-outline" />
          <Options
            title="My Orders"
            color="#fd6d24"
            iconName="newspaper-outline"
            navigateTo="Orders"
          />
          <Options
            title="Addresses"
            color="#7051eb"
            iconName="business-outline"
            navigateTo="Address"
          />
          <Options
            title="About"
            color="#ed3bc5"
            iconName="information-outline"
          />
          <Options
            title="Preferences"
            color="#1756a3"
            iconName="settings-outline"
          />
          <Options
            title="Logout"
            color="#ee3f3e"
            iconName="exit-outline"
            logOut={true}
          />
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
    marginTop: 25,
  },
  nameStyle: {
    fontSize: 24,
    fontFamily: fonts.Bold,
  },

  cardsContainer: {
    marginTop: 20,
  },
});

export default ProfileScreen;
