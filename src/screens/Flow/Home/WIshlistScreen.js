import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Header from "../../../components/General/Header";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../../components/General/ProductItem";
import fonts from "../../../constants/fonts";
import { Button } from "react-native-paper";
import * as authActions from "../../../store/actions/Auth";
import PicWithText from "../../../components/General/PicWithText";

export default function WIshlistScreen({ navigation }) {
  const profileData = useSelector((state) => state.Profile);
  const token = useSelector((state) => state.Auth.token);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.Cart.cartProducts); //used to check if items added in cart are bookmarked as well..then the quantity is showed here
  const allProducts = useSelector((state) => state.Products.products); //used to filter all the bookmarks from all products
  const bookmarks = profileData.bookmarks.map((prod) => {
    const productIndex = allProducts.findIndex(
      (product) => product._id === prod.productId
    );
    return allProducts[productIndex];
  });

  if (!token) {
    return (
      <PicWithText>
        <Image
          source={{ uri: "https://img.icons8.com/nolan/2x/wish-list.png" }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ fontSize: 18, fontFamily: fonts.Bold }}>
          Please login to add items into wishlist
        </Text>
        <Button
          onPress={() => {
            dispatch(authActions.continueWithAuthentication());
          }}
          mode="outlined"
          color={Colors.tertiary}
          contentStyle={{ padding: 10 }}
          style={{ marginTop: 20 }}
        >
          Login
        </Button>
      </PicWithText>
    );
  }

  return (
    <View style={styles.container}>
      <Header text="Wishlist" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookmarks}
        style={{ marginTop: 15 }}
        numColumns={2}
        keyExtractor={(Item) => Item._id}
        renderItem={({ item }) => {
          let qty;
          let index = cartProducts.findIndex(
            (product) => product.productId === item._id
          );
          if (index === -1) {
            qty = 0;
          } else {
            qty = cartProducts[i].quantity;
          }
          return (
            <ProductItem
              name={item.name}
              quantity={qty}
              indianName={item.indianName}
              imageUrl={item.imageUrl}
              category={item.Category}
              priceKg={item.priceKg}
              priceQty={item.priceQty}
              weightOnly={item.weightOnly}
              _id={item._id}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: Colors.bkg,
  },
});
