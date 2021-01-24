import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as profileActions from "../../../store/actions/Profile";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Divider } from "react-native-paper";
import AddressHeader from "../../../components/General/AddressHeader";
import Colors from "../../../constants/Colors";
import Categories from "../../../components/Home/Categories";
import * as productActions from "../../../store/actions/Products";
import Carousel from "../../../components/Home/Carousel";
import ChooseLiveOrOtherLocation from "../../../components/General/ChooseLocationType";
import Dash from "react-native-dash";
import fonts from "../../../constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import ServerDown from "../../../components/General/ServerDown";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);
  const address = useSelector(
    (state) => state.Profile.selectedLocation.address
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (token.length > 0) {
        await dispatch(profileActions.getProfileData(token));
      }
      await dispatch(productActions.getAllProducts());
      setError(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    //POP UP LOCATION TYPE DIALOG IF NO ADDRESS IS SELECTED
    if (address.length === 0 && !error) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [setIsVisible, address, error]);

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

  if (error) {
    return <ServerDown fetchData={fetchData} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitleStyle}>Grocery store</Text>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 20, top: "3%" }}
          onPress={() => navigation.navigate("Wishlist")}
        >
          <Ionicons name="leaf-sharp" size={24} color={Colors.sub} />
        </TouchableOpacity>

        <Dash
          style={{
            width: "100%",
            height: 2,
            elevation: 10,
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
        <Divider />
        <Categories />
        <Divider />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 60,
    justifyContent: "center",
  },
  headerTitleStyle: {
    fontSize: 18,
    textTransform: "uppercase",
    color: Colors.primary,
    fontFamily: fonts.Bold,
  },
});

export default HomeScreen;
