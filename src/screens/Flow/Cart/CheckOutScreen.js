import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import Header from "../../../components/General/Header";
import AddressBar from "../../../components/Cart/AddressBar";
import PaymentBar from "../../../components/Cart/PaymentBar";
import Bill from "../../../components/Cart/Bill";
import { Button } from "react-native-paper";
import * as orderActions from "../../../store/actions/Orders";

const CheckOutScreen = ({ navigation }) => {
  const profileData = useSelector((state) => state.Profile);
  const products = useSelector((state) => state.Cart.cartProducts);
  const price = useSelector((state) => state.Cart.totalAmount);
  const token = useSelector((state) => state.Auth.token);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.Products.products);
  const [isLoading, setIsLoading] = useState(false);
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

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: Colors.bkg,
        }}
      >
        <ActivityIndicator size="large" color={Colors.tertiary} />
        <Text style={{ fontSize: 20, marginVertical: 15, fontStyle: "italic" }}>
          Ordering..
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <Header text="Check Out" />

            <AddressBar
              deliveryAddress={profileData.selectedLocation.address}
              phoneNumber={profileData.phoneNumber}
              username={profileData.username}
            />
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
              onPress={async () => {
                if (!profileData.paymentMethod) {
                  ToastAndroid.showWithGravityAndOffset(
                    "Please select a payment method",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
                  return;
                }
                setIsLoading(true);
                await dispatch(
                  orderActions.orderNow(
                    token,
                    profileData.paymentMethod,
                    profileData.selectedLocation.coords.lat,
                    profileData.selectedLocation.coords.lng,
                    profileData.selectedLocation.address
                  )
                );
                setIsLoading(false);
                navigation.navigate("Confirmation");
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
