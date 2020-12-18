import React, { useState, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../../../store/actions/Profile";
import DP from "../../../components/Profile/DP";
import ProductItem from "../../../components/General/ProductItem";
import { Entypo } from "@expo/vector-icons";
import CardButton from "../../../components/Profile/CardButton";

const ProfileScreen = ({ navigation }) => {
  const profileData = useSelector((state) => state.Profile);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(`${profileData.imageURL}`);
  const cartProducts = useSelector((state) => state.Cart.cartProducts); //used to check if items added in cart are bookmarked as well..then the quantity is showed here
  const allProducts = useSelector((state) => state.Products.products); //used to filter all the bookmarks from all products
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(profileActions.getProfileData(profileData.token));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return Alert.alert(
        "Something Went Wrong!",
        "Please check your internet connection",
        [
          {
            text: "Try Again",
            onPress: dispatch(profileActions.getProfileData(token)),
          },
        ]
      );
    }
  }, [isLoading, dispatch]);
  useEffect(() => {
    const willFocus = navigation.addListener("focus", fetchData);

    return () => {
      willFocus();
    };
  }, [fetchData]);

  const bookmarks = profileData.bookmarks.map((prod) => {
    const productIndex = allProducts.findIndex(
      (product) => product._id === prod.productId
    );
    return allProducts[productIndex];
  });
  if (isLoading) {
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator size="large" color={Colors.tertiary} />
      <Text style={{ fontSize: 16, marginVertical: 15 }}>
        Updating your profile
      </Text>
    </View>;
  }
  return (
    <View style={styles.container} centerContent={true}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookmarks}
        keyExtractor={(Item) => Item._id}
        ListHeaderComponent={
          <>
            <DP
              username={profileData.username}
              image={image}
              setImage={setImage}
              canEdit={false}
            />

            <View style={{ marginVertical: 10, marginTop: 80 }}>
              <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>
                Account Details
              </Text>
            </View>
            <View style={styles.cardsContainer}>
              <CardButton title="Personal Info" icon="user" />
              <CardButton
                title="Payments"
                icon="credit-card-settings-outline"
              />
              <CardButton title="My Orders" icon="pencil-outline" />
              <CardButton title="Settings" icon="settings" />
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
