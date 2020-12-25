import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/Auth";
import { Button } from "react-native-paper";
import Header from "../General/Header";
import Colors from "../../constants/Colors";

const NotAuthenticated = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>LIVE</Text>
          <Text style={[styles.textStyle, { marginVertical: -25 }]}>FOR</Text>
          <Text style={styles.textStyle}>FOOD</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/grocery.jpg")}
            resizeMode="contain"
            style={{ height: 110, width: 110 }}
          />
        </View>
      </View>

      <View style={styles.headerContainer}>
        <Header text="Your Profile" textSize={25} />
        <Text style={{ fontSize: 18, color: "black" }}>
          Log in or sign up to view your complete profile
        </Text>
      </View>
      <Button
        mode="contained"
        style={styles.buttonStyle}
        onPress={() => {
          dispatch(authActions.continueWithAuthentication());
        }}
        contentStyle={{ paddingVertical: 5 }}
        color={Colors.tertiary}
      >
        Continue
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  upperContainer: { height: "60%", backgroundColor: "#d3d3d3", width: "100%" },
  textStyle: {
    fontSize: 50,
    color: "#888",
    fontWeight: "bold",
  },
  imageContainer: {
    position: "absolute",
    bottom: 10,
    left: "40%",
    overflow: "hidden",
    borderRadius: 60,
    elevation: 5,
    backgroundColor: "white",
  },
  textContainer: { position: "absolute", bottom: 0, left: 10 },
  buttonStyle: {
    margin: 15,
    marginTop: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.tertiary,
  },
});

export default NotAuthenticated;
