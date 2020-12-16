import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
// import ProductItem from '../../../components/Products/ProductItem';
import Colors from "../../../../constants/Colors";
import { useSelector } from "react-redux";

const GrainsProductsScreen = ({ route, navigation }) => {
  let { title } = route.params;
  const products = useSelector((state) =>
    state.Products.products.filter(
      (product) =>
        product.Category === "Grains" && product.subCategory === title
    )
  );

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Grains" textSize={30} />
      </View>
      {/* <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => {
          let i = cartProducts.findIndex(
            (product) => product.productId === item._id,
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
              category="Grains"
              _id={item._id}
            />
          );
        }}
      />
     */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
});

export default GrainsProductsScreen;
