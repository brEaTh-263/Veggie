import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ProductItem from "../../../components/General/ProductItem";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import { Searchbar } from "react-native-paper";
import Header from "../../../components/General/Header";
import BackButton from "../../../components/General/BackButton";
import useSearchGrocery from "../../../hooks/useSearchGrocery";
import ViewCart from "../../../components/Cart/ViewCart";

const AllProductsScreen = ({ route, navigation }) => {
  const { title, subCategory } = route.params;
  const products = useSelector((state) =>
    state.Products.products.filter((prod) => {
      if (subCategory) {
        return prod.subCategory === title;
      } else {
        return prod.Category === title;
      }
    })
  );
  const cartProducts = useSelector((state) => state.Cart.cartProducts);
  const [getSearchedGrocery, items, setItems] = useSearchGrocery(
    title,
    subCategory
  );

  useEffect(() => {
    setItems(products);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <Header text={title} />

            <Searchbar
              style={{ marginVertical: 15, marginHorizontal: 15 }}
              onChangeText={(text) => {
                getSearchedGrocery(text);
              }}
              placeholder="Search here..."
            />
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
              indianName={item.indianName}
              imageUrl={item.imageUrl}
              price={item.price}
              quantity={i}
              _id={item._id}
              category={title}
            />
          );
        }}
      />
      {cartProducts.length > 0 && <ViewCart navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
});

export default AllProductsScreen;
