import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import Header from "../../../components/General/Header";
import AddressBar from "../../../components/Cart/AddressBar";
import PaymentBar from "../../../components/Cart/PaymentBar";
import Bill from "../../../components/Cart/Bill";
import { Button } from "react-native-paper";

const CheckOutScreen = ({ navigation }) => {
  const profileData = useSelector((state) => state.Profile);
  const products = useSelector((state) => state.Cart.cartProducts);
  const price = useSelector((state) => state.Cart.totalAmount);
  console.log(products);
  const allProducts = useSelector((state) => state.Products.products);
  const cartProducts = products.map((prod) => {
    //GETTING ALL DETAILS OF A PRODUCT THROUGH ITS ID
    const productIndex = allProducts.findIndex(
      (product) => product._id === prod.productId
    );
    allProducts[productIndex].totalPrice = prod.price;
    allProducts[productIndex].totalQuantity = prod.quantity;
    allProducts[productIndex].isKg = prod.isKg;
    return allProducts[productIndex];
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <Header text="Check Out" />

            <AddressBar profileData={profileData} />
            <PaymentBar />
            <View
              style={{
                margin: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ borderBottomWidth: 1, fontWeight: "bold" }}>
                {products.length} Details
              </Text>
              <Text style={{ fontWeight: "bold" }}> ${price}</Text>
            </View>
            <Bill price={price} />
            <View
              style={{
                marginHorizontal: 15,
              }}
            >
              <Text style={{ fontStyle: "italic" }}>
                *By confirming the order,you agree to these terms and conditions{" "}
              </Text>
            </View>
            <Button
              color="black"
              dark={true}
              mode="contained"
              style={{ margin: 15 }}
              contentStyle={{ padding: 5 }}
              labelStyle={{ fontWeight: "bold" }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              Confirm Payment
            </Button>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginHorizontal: 15 }}
            >
              Details
            </Text>
          </>
        }
        renderItem={({ item }) => {
          return (
            <View
              style={{
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Image
                resizeMode="contain"
                source={{ uri: item.imageUrl }}
                style={{ width: 100, height: 100 }}
              />
              <View>
                <Text
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  {item.name} / {item.indianName}
                </Text>
                {item.isKg ? (
                  <Text>Kg:{item.totalQuantity}</Text>
                ) : (
                  <Text>Qty:{item.totalQuantity}</Text>
                )}
                <Text style={{ fontSize: 16 }}>Price: ${item.totalPrice}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
});
