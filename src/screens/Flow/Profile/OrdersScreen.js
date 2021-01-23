import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Header from "../../../components/General/Header";
import OrderItem from "../../../components/General/OrderItem";
import Colors from "../../../constants/Colors";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.Orders.orders);
  //   console.log(orders);

  //  const allProducts = useSelector((state) => state.Products.products);
  //  const products = useSelector((state) => state.Cart.cartProducts);

  //  const cartProducts = orders.map((order) => {
  //    //GETTING ALL DETAILS OF A PRODUCT THROUGH ITS ID
  //    const productIndex = allProducts.findIndex(
  //      (product) => product._id === order.productId
  //    );
  //    allProducts[productIndex].totalPrice = prod.price;
  //    allProducts[productIndex].totalQuantity = prod.quantity;
  //    allProducts[productIndex].isKg = prod.isKg;
  //    return allProducts[productIndex];
  //  });

  return (
    <View style={styles.container}>
      <Header text="My Order" />
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <OrderItem item={item} />;
        }}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.bkg,
    marginTop: 25,
  },
});
