import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import Header from "../../../components/General/Header";
import { useSelector } from "react-redux";
// import { FlatList } from "react-native";
// import ProductItem from "../../components/Products/ProductItem";
import Colors from "../../../constants/Colors";

const SearchGroceriesScreen = () => {
  const [items, setItems] = useState([]);
  //   const products = useSelector((state) => state.Products.products);
  //   const cartProducts = useSelector((state) => state.Cart.cartProducts);
  //   const getSearchedGrocery = useCallback(async (text) => {
  //     const searched = products.filter((product) => {
  //       let name = product.name.toLowerCase();
  //       let indianName;
  //       if (product.indianName) {
  //         indianName = product.indianName.toLowerCase();
  //       } else {
  //         indianName = product.name.toLowerCase();
  //       }
  //       if (
  //         name.includes(text.toLowerCase()) ||
  //         indianName.includes(text.toLowerCase())
  //       ) {
  //         return true;
  //       } else false;
  //     });
  //     // console.log(searched);
  //     setItems(searched);
  //   }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bkg }}>
      <View style={{ margin: 20 }}>
        <Header text="Search" textSize={30} />
        <Searchbar
          style={{ backfaceVisibility: "visible", marginVertical: 15 }}
          placeholder="Enter name"
          onChangeText={(text) => {
            // getSearchedGrocery(text);
          }}
        />

        {/* {items.length === 0 && (
          <View style={{ height: "50%", marginTop: 50 }}>
            <Image
              resizeMode="contain"
              source={{
                uri:
                  "https://images263.s3-us-west-1.amazonaws.com/assets/SearchGroceriesPic.png",
              }}
              style={{ height: "80%", width: "100%" }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginVertical: 15,
              }}
            >
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
        /> */}
      </View>
    </View>
  );
};

export default SearchGroceriesScreen;
