import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import Header from "../../../components/General/Header";
import { useSelector } from "react-redux";
import ProductItem from "../../../components/General/ProductItem";
import Colors from "../../../constants/Colors";
import useSearchGrocery from "../../../hooks/useSearchGrocery";

const SearchGroceriesScreen = () => {
  const products = useSelector((state) => state.Products.products);
  const cartProducts = useSelector((state) => state.Cart.cartProducts);

  const [getSearchedGrocery, items, setItems] = useSearchGrocery("");

  return (
    <View style={styles.container}>
      <View style={{ margin: 20, marginTop: 35 }}>
        <Header text="Search" textSize={30} />
        <Searchbar
          style={{ marginVertical: 15 }}
          placeholder="Enter name"
          onChangeText={(text) => {
            getSearchedGrocery(text);
          }}
        />

        {items.length === 0 && (
          <View style={styles.notFoundContainerStyle}>
            <Image
              resizeMode="contain"
              source={{
                uri:
                  "https://images263.s3-us-west-1.amazonaws.com/assets/SearchGroceriesPic.png",
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.title}>
              Search for specific items here..Add some quote here
            </Text>
          </View>
        )}
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            let i = cartProducts.findIndex(
              (product) => product._id === item._id
            );
            if (i === -1) {
              i = 0;
            } else {
              i = cartProducts[i].qty;
            }
            return (
              <ProductItem
                name={item.name}
                indianName={item.indianName}
                imageUrl={item.imageUrl}
                price={item.price}
                quantity={i}
                category={item.Category}
                _id={item._id}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bkg },
  imageStyle: { height: "80%", width: "100%" },
  notFoundContainerStyle: { height: "50%", marginTop: 50 },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
});

export default SearchGroceriesScreen;
