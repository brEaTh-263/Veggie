import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Searchbar, List, Divider } from "react-native-paper";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";
import { useDispatch } from "react-redux";
import * as profileActions from "../../../../store/actions/Profile";
import useSearchLocation from "../../../../hooks/useSearchLocation";

const SearchLocationsScreen = ({ navigation, route }) => {
  const { addressOnly, inCart } = route.params;
  //addressOnly IF WANT TO GET THE SELECTED LOCATION,AFTER SELECTION IF INCART IS FALSE NAVIGATE TO HOME
  //inCart AFTER SELECTING LOCATION NAVIGATE TO CART

  const dispatch = useDispatch();

  const [getSearchLocation, items, setItems] = useSearchLocation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Search for a location" textSize={20} />
      </View>
      <Searchbar
        style={{ margin: 10 }}
        placeholder="Enter location"
        onChangeText={getSearchLocation}
      />

      {items.length === 0 && (
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={{
              uri:
                "https://images263.s3-us-west-1.amazonaws.com/assets/searchLocationPic.png",
            }}
            style={styles.imageStyle}
          />
          <Text style={styles.title}>Search for a location</Text>
        </View>
      )}

      <FlatList
        data={items}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                if (addressOnly) {
                  await dispatch(
                    profileActions.getSelectedAddress(item.address, {
                      lat: item.coords.lat,
                      lng: item.coords.lng,
                    })
                  );
                  if (inCart) {
                    navigation.navigate("Cart");
                    return;
                  }
                  navigation.navigate("Home");
                  return;
                }
                navigation.push("AddAddress", {
                  newCoords: {
                    lat: item.coords.lat,
                    lng: item.coords.lng,
                  },
                });
              }}
            >
              <List.Item
                title={item.name}
                description={item.address}
                style={{ padding: 10 }}
                titleStyle={{ fontWeight: "bold" }}
                descriptionStyle={{ fontSize: 12 }}
                left={(props) => (
                  <List.Icon {...props} icon="map-marker-outline" />
                )}
              />
              <Divider />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bkg },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    marginVertical: 15,
  },
  imageStyle: { height: "80%", width: "100%" },
  imageContainer: { height: "50%", marginTop: 50 },
});

export default SearchLocationsScreen;
