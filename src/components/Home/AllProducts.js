import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import ProductItem from "../General/ProductItem";
import { useSelector } from "react-redux";
import { Searchbar } from "react-native-paper";
import useSearchGrocery from "../../hooks/useSearchGrocery";

export default AllProducts = ({ category, subCategory, title }) => {
  const products = useSelector((state) =>
    state.Products.products.filter((prod) => {
      if (subCategory) {
        if (category === "All" && prod.Category === title) {
          return true;
        } else {
          return prod.subCategory === category;
        }
      } else {
        if (category === "All") {
          return true;
        }
        return prod.Category === category;
      }
    })
  );
  const cartProducts = useSelector((state) => state.Cart.cartProducts);
  const [getSearchedGrocery, items, setItems] = useSearchGrocery(
    title,
    subCategory,
    category
  );

  useEffect(() => {
    setItems(products);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={2}
        data={items}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <Searchbar
              style={{
                marginVertical: 15,
                marginHorizontal: 15,
                borderRadius: 20,
                overflow: "hidden",
              }}
              onChangeText={(text) => {
                getSearchedGrocery(text);
              }}
              placeholder="I want to buy.."
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
    </View>
  );
};
