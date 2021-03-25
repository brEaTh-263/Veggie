import React, { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
} from "react-native";
import Header from "../../../components/General/Header";
import Colors from "../../../constants/Colors";
import StepIndicator from "react-native-step-indicator";
import fonts from "../../../constants/fonts";
import AddressBar from "../../../components/Cart/AddressBar";
import * as orderActions from "../../../store/actions/Orders";
import { useSelector, useDispatch } from "react-redux";

const OrderDetailScreen = ({ route }) => {
  const token = useSelector((state) => state.Auth.token);
  const { order, date } = route.params;
  const dispatch = useDispatch();
  const labels = ["Confirmed", "Processing", "On the Way", "Delivered"];
  const [refreshing, setRefreshing] = useState(false);
  const getOrders = async () => {
    console.log("Called");
    setRefreshing(true);
    await dispatch(orderActions.getAllOrders(token));
    let x = order.status.length - 1;
    let index = labels.findIndex(
      (label) => label === order.status[x].condition
    );
    setCurrentPosition(index);
    console.log(currentPosition);
    setRefreshing(false);
  };
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    console.log("Inside");
    console.log(order.status);
    let x = order.status.length - 1;
    let index = labels.findIndex(
      (label) => label === order.status[x].condition
    );
    setCurrentPosition(index);
  });

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getOrders} />
        }
        data={order.products}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <Header text="Previous Order" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  width: 200,
                  color: Colors.sub,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                ellipsizeMode="tail"
              >
                Order ID: {order._id}{" "}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{date}</Text>
            </View>
            <View style={{ height: 400, alignItems: "center" }}>
              <StepIndicator
                stepCount={4}
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                direction="vertical"
                renderStepIndicator={(positon, stepStatus) => {
                  // console.log(positon, stepStatus);
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text
                style={{
                  alignItems: "center",
                  borderBottomWidth: 1,
                  fontSize: 18,
                  borderBottomColor: Colors.tertiary,
                  color: Colors.tertiary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Order Tracking
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderTopWidth: StyleSheet.hairlineWidth,
                paddingTop: 20,
                marginHorizontal: 15,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Total Bill
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: Colors.primary,
                }}
              >
                $ {order.totalAmount}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 20,
                marginHorizontal: 15,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Payment Method
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: Colors.primary,
                }}
              >
                {order.paymentMethod === "Cash on Delivery"
                  ? "COD"
                  : order.paymentMethod}
              </Text>
            </View>
            <AddressBar
              deliveryAddress={order.deliveryAddress.address}
              phoneNumber={order.phoneNumber}
              username={order.username}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,

                marginHorizontal: 15,
                marginVertical: 20,
              }}
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
                marginHorizontal: 40,
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
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
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

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
});

const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#888",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#a9d4b8",
  stepStrokeUnFinishedColor: "#888",
  separatorFinishedColor: "#a9d4b8",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#a9d4b8",
  stepIndicatorUnFinishedColor: "rgba(255,255,255,0.5)",
  stepIndicatorCurrentColor: "#a9d4b8",
  stepIndicatorLabelFontSize: 16,
  currentStepIndicatorLabelFontSize: 13,
  labelColor: "grey",
  labelSize: 15,
  labelAlign: "baseline",
  labelFontFamily: fonts.Bold,
  currentStepLabelColor: "rgba(0,0,0,5)",
};
