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
  const dispatch = useDispatch();
  const [image, setImage] = useState(`${profileData.imageURL}`);
  const token = useSelector((state) => state.Auth.token);
  const cartProducts = useSelector((state) => state.Cart.cartProducts); //used to check if items added in cart are bookmarked as well..then the quantity is showed here
  const allProducts = useSelector((state) => state.Products.products); //used to filter all the bookmarks from all products
  const bookmarks = profileData.bookmarks.map((prod) => {
    const productIndex = allProducts.findIndex(
      (product) => product._id === prod.productId
    );
    return allProducts[productIndex];
  });
  console.log(profileData);

  useEffect(() => {
    setImage(`${profileData.imageURL}`);
  }, [profileData, setImage]);

  if (token.length === 0) {
    return <NotAuthenticated />;
  }

  return (
    <View style={styles.container} centerContent={true}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookmarks}
        keyExtractor={(Item) => Item._id}
        ListHeaderComponent={
          <>
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
              <CardButton
                title="Payments"
                icon="credit-card-settings-outline"
              />
              <CardButton title="My Orders" icon="pencil-outline" />
              <CardButton
                title="Settings"
                icon="settings"
                navScreen="Settings"
              />
            </View>

            <View style={{ marginTop: 10, marginVertical: 10 }}>
              <Text style={styles.bookmarkTitle}>Your bookmarks</Text>
            </View>
            {profileData.bookmarks.length === 0 && (
              <View style={styles.bookmarkIconContainer}>
                <Entypo name="bookmarks" size={30} color="#888" />
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Bookmarks will appear here...
                </Text>
              </View>
            )}
          </>
        }
        renderItem={({ item }) => {
          let i = cartProducts.findIndex(
            (product) => product.productId === item._id
          );
          if (i === -1) {
            i = 0;
          } else {
            i = cartProducts[i].quantity;
          }
          return (
            <ProductItem
              name={item.name}
              quantity={i}
              indianName={item.indianName}
              imageUrl={item.imageUrl}
              category={item.Category}
              price={item.price}
              _id={item._id}
            />
          );
        }}
      />
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
