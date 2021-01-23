import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Header from "../../../components/General/Header";
import OrderItem from "../../../components/General/OrderItem";
import PicWithText from "../../../components/General/PicWithText";
import Colors from "../../../constants/Colors";
import { Button } from "react-native-paper";
import fonts from "../../../constants/fonts";
import { StackActions } from "@react-navigation/native";

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.Orders.orders);
  if (orders.length === 0) {
    return (
      <PicWithText>
        <Image
          source={{ uri: "https://img.icons8.com/nolan/2x/purchase-order.png" }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ fontSize: 18, fontFamily: fonts.Bold }}>
          Your orders will be visible here
        </Text>
        <Button
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate("Cart");
          }}
          mode="outlined"
          color={Colors.tertiary}
          contentStyle={{ padding: 10 }}
          style={{ marginTop: 20 }}
        >
          Order Now!
        </Button>
      </PicWithText>
    );
  }

  return (
    <View style={styles.container}>
      <Header text="My Order" navigateTo="Profile" />
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
