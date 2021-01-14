import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../../../components/General/Header";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import ProductItem from "../../../components/General/ProductItem";

export default function WIshlistScreen() {
  const profileData = useSelector((state) => state.Profile);

  const cartProducts = useSelector((state) => state.Cart.cartProducts); //used to check if items added in cart are bookmarked as well..then the quantity is showed here
  const allProducts = useSelector((state) => state.Products.products); //used to filter all the bookmarks from all products
  const bookmarks = profileData.bookmarks.map((prod) => {
    const productIndex = allProducts.findIndex(
      (product) => product._id === prod.productId
    );
    return allProducts[productIndex];
  });

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
