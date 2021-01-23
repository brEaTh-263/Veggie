import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const OrderItem = ({ item }) => {
  const navigation = useNavigation();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let current_datetime = new Date(item.status[0].date);
  let formatted_date =
    current_datetime.getDate() +
    " " +
    months[current_datetime.getMonth()] +
    "," +
    current_datetime.getFullYear();
  console.log(formatted_date);

  const allProducts = useSelector((state) => state.Products.products);

  item.products = item.products.map((prod) => {
    const productIndex = allProducts.findIndex(
      (product) => product._id === prod.productId
    );
    allProducts[productIndex].totalPrice = prod.price;
    allProducts[productIndex].totalQuantity = prod.quantity;
    allProducts[productIndex].isKg = prod.isKg;
    return allProducts[productIndex];
  });
  console.log(Dimensions.get("window").width);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("OrderDetail", {
          order: item,
          date: formatted_date,
        });
      }}
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 10,
        marginVertical: 15,
      }}
    >
      <Image
        resizeMode="contain"
        source={{
          uri: item.products[0].imageUrl,
        }}
        style={{ width: 80, height: 100 }}
      />
      <View
        style={{
          width: Dimensions.get("window").width - 140,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {item.status[0].condition}
          </Text>
          <Text>{formatted_date}</Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            marginTop: 10,
            width: 200,
            fontWeight: "bold",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Order ID:{item._id}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({});
