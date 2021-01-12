import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import * as profileActions from "../../../store/actions/Profile";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Button } from "react-native-paper";
import AddressHeader from "../../../components/General/AddressHeader";
import Colors from "../../../constants/Colors";
import Categories from "../../../components/Home/Categories";
import * as productActions from "../../../store/actions/Products";
import Carousel from "../../../components/Home/Carousel";
import ChooseLiveOrOtherLocation from "../../../components/General/ChooseLocationType";
import Dash from "react-native-dash";
const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);
  const address = useSelector(
    (state) => state.Profile.selectedLocation.address
  );
  const [isLoading, setIsLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (token.length > 0) {
          await dispatch(profileActions.getProfileData(token));
        }
        // await dispatch(productActions.getAllProducts());

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        return Alert.alert(
          "Something Went Wrong!",
          "Please check your internet connection",
          [
            {
              text: "Try Again",
              onPress: async () => {
                fetchData();
              },
            },
          ]
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    //POP UP LOCATION TYPE DIALOG IF NO ADDRESS IS SELECTED
    if (address.length === 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [setIsVisible, address]);

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: Colors.bkg,
        }}
      >
        <ActivityIndicator size="large" color={Colors.tertiary} />
        <Text style={{ fontSize: 20, marginVertical: 15, fontStyle: "italic" }}>
          Getting credentials...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#fff",
            width: "100%",
            height: 60,
            // borderWidth: 1,
            justifyContent: "center",
            borderStyle: "solid",
            borderColor: "#fff",
            borderBottomColor: Colors.primary,
            opacity: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textTransform: "uppercase",
              color: Colors.primary,
              fontWeight: "bold",
              fontFamily: "logo",
            }}
          >
            Grocery store
          </Text>
        </View>
        <Dash
          style={{
            width: "100%",
            height: 3,
            opacity: 10,
          }}
          dashColor="#fff"
          dashThickness={10}
          dashLength={10}
          dashStyle={{ borderRadius: 100, overflow: "hidden" }}
        />
        <ChooseLiveOrOtherLocation
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          inCart={false}
        />
        <AddressHeader setIsVisible={setIsVisible} address={address} />

        <Carousel />

        <Categories />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: "#f4f5f7",
  },
});

export default HomeScreen;
