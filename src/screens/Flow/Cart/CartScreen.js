import React, { useRef, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../components/General/Header";
import ProductItem from "../../../components/General/ProductItem";
import Colors from "../../../constants/Colors";
import { Button } from "react-native-paper";
import CheckOut from "../../../components/Cart/CheckOut";
import ChooseLocationType from "../../../components/General/ChooseLocationType";
import { MaterialIcons } from "@expo/vector-icons";
import * as cartActions from "../../../store/actions/Cart";
import fonts from "../../../constants/fonts";

const CartScreen = ({ navigation }) => {
  const products = useSelector((state) => state.Cart.cartProducts);
  const allProducts = useSelector((state) => state.Products.products);
  const profileData = useSelector((state) => state.Profile);
  const amount = useSelector((state) => state.Cart.totalAmount);
  const [isVisible, setIsVisible] = useState(false);
  const token = useSelector((state) => state.Auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const cartProducts = products.map((prod) => {
    //GETTING ALL DETAILS OF A PRODUCT THROUGH ITS ID
    const productIndex = allProducts.findIndex(
      (product) => product._id === prod.productId
    );
    allProducts[productIndex].quantity = prod.quantity;
    return allProducts[productIndex];
  });
  const dispatch = useDispatch();
  // console.log(cartProducts);

  const vegetableProducts = cartProducts.filter(
    (product) => product.Category === "Vegetables"
  );
  const fruitProducts = cartProducts.filter(
    (product) => product.Category === "Fruits"
  );
  const nonVegProducts = cartProducts.filter(
    (product) => product.Category === "Non-Veg"
  );
  const grainProducts = cartProducts.filter(
    (product) => product.Category === "Grains"
  );

  useEffect(() => {
    if (profileData.selectedLocation.address.length === 0) {
      setIsVisible(true);
    }
  }, [setIsVisible]);

  if (amount === 0 && cartProducts.length == 0) {
    return (
      <View style={styles.emptyContainerStyle}>
        <Image
          source={{ uri: "https://img.icons8.com/nolan/2x/shopping-bag.png" }}
          style={{ height: 200, width: 200 }}
        />
        <Text style={{ fontSize: 18, fontFamily: fonts.Bold }}>
          Items in the cart will be visible here
        </Text>
        <Button
          onPress={() => {
            navigation.navigate("Home");
          }}
          mode="outlined"
          color={Colors.tertiary}
          contentStyle={{ padding: 10 }}
          style={{ marginTop: 20 }}
        >
          Add Now!!
        </Button>
      </View>
    );
  }

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
          Clearing Cart..
        </Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: Colors.bkg, flex: 1, marginTop: 25 }}>
      <Header text="Cart" />
      <TouchableOpacity
        onPress={async () => {
          Alert.alert(
            "Are you sure you want to continue?",
            "Items in the cart will be removed",
            [
              {
                text: "Yes",
                onPress: async () => {
                  setIsLoading(true);
                  await dispatch(cartActions.emptyCart(token));
                  setIsLoading(false);
                },
              },
              {
                text: "No",
              },
            ]
          );
        }}
        style={{ position: "absolute", right: "3%", top: "3%" }}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
      <ChooseLocationType
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        inCart={true}
      />
      <FlatList
        data={vegetableProducts}
        sections={products}
        numColumns={2}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          vegetableProducts.length > 0 && (
            <View style={styles.categoryContainerStyle}>
              <Text style={styles.categoryTitle}>Vegetables</Text>
            </View>
          )
        }
        ListFooterComponent={
          <FlatList
            data={fruitProducts}
            sections={products}
            numColumns={2}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              fruitProducts.length > 0 && (
                <View style={styles.categoryContainerStyle}>
                  <Text style={styles.categoryTitle}>Fruits</Text>
                </View>
              )
            }
            ListFooterComponent={
              <FlatList
                data={nonVegProducts}
                sections={products}
                numColumns={2}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                  nonVegProducts.length > 0 ? (
                    <View style={styles.categoryContainerStyle}>
                      <Text style={styles.categoryTitle}>Meat</Text>
                    </View>
                  ) : null
                }
                ListFooterComponent={
                  <FlatList
                    data={grainProducts}
                    sections={products}
                    numColumns={2}
                    keyExtractor={(item) => item._id}
                    ListHeaderComponent={
                      grainProducts.length > 0 ? (
                        <View style={styles.categoryContainerStyle}>
                          <Text style={styles.categoryTitle}>Grains</Text>
                        </View>
                      ) : null
                    }
                    ListFooterComponent={
                      <View style={{ margin: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          Bill Details
                        </Text>
                        <View style={styles.otherTitleContainerStyle}>
                          <Text style={{ fontSize: 15 }}>Item total</Text>
                          <Text>Rs {amount}</Text>
                        </View>

                        <View style={styles.otherTitleContainerStyle}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: Colors.tertiary,
                              borderBottomWidth: 1,
                              borderStyle: "dotted",
                            }}
                          >
                            Delivery Partner Fee
                          </Text>
                          <Text>Rs 70</Text>
                        </View>
                        <View style={styles.otherTitleContainerStyle}>
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            To pay
                          </Text>
                          <Text>Rs {amount + 70}</Text>
                        </View>
                      </View>
                    }
                    renderItem={({ item }) => {
                      let isKg;
                      let i = products.findIndex(
                        (product) => product.productId === item._id
                      );
                      if (i === -1) {
                        i = 0;
                      } else {
                        isKg = products[i].isKg;
                        i = products[i].quantity;
                      }

                      return (
                        <ProductItem
                          name={item.name}
                          indianName={item.indianName}
                          imageUrl={item.imageUrl}
                          priceKg={item.priceKg}
                          priceQty={item.priceQty}
                          weightOnly={item.weightOnly}
                          isKg={isKg}
                          quantity={item.quantity}
                          _id={item._id}
                          category="Fruits"
                        />
                      );
                    }}
                  />
                }
                renderItem={({ item }) => {
                  let isKg;
                  let i = products.findIndex(
                    (product) => product.productId === item._id
                  );
                  if (i === -1) {
                    i = 0;
                  } else {
                    isKg = products[i].isKg;
                    i = products[i].quantity;
                  }

                  return (
                    <ProductItem
                      name={item.name}
                      indianName={item.indianName}
                      imageUrl={item.imageUrl}
                      priceKg={item.priceKg}
                      priceQty={item.priceQty}
                      weightOnly={item.weightOnly}
                      isKg={isKg}
                      quantity={item.quantity}
                      _id={item._id}
                      category="Non-Veg"
                    />
                  );
                }}
              />
            }
            renderItem={({ item }) => {
              let isKg;
              let i = products.findIndex(
                (product) => product.productId === item._id
              );
              if (i === -1) {
                i = 0;
              } else {
                isKg = products[i].isKg;
                i = products[i].quantity;
              }

              return (
                <ProductItem
                  name={item.name}
                  indianName={item.indianName}
                  imageUrl={item.imageUrl}
                  priceKg={item.priceKg}
                  priceQty={item.priceQty}
                  weightOnly={item.weightOnly}
                  isKg={isKg}
                  quantity={item.quantity}
                  _id={item._id}
                  category="Fruits"
                />
              );
            }}
          />
        }
        renderItem={({ item }) => {
          let isKg;
          let i = products.findIndex(
            (product) => product.productId === item._id
          );
          if (i === -1) {
            i = 0;
          } else {
            isKg = products[i].isKg;
            i = products[i].quantity;
          }

          return (
            <ProductItem
              name={item.name}
              indianName={item.indianName}
              imageUrl={item.imageUrl}
              priceKg={item.priceKg}
              priceQty={item.priceQty}
              weightOnly={item.weightOnly}
              isKg={isKg}
              quantity={item.quantity}
              _id={item._id}
              category="Vegetables"
            />
          );
        }}
      />

      <CheckOut amount={amount} setIsVisible={setIsVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainerStyle: {
    flex: 1,
    backgroundColor: Colors.bkg,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 18,
    color: Colors.sub,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  categoryContainerStyle: {
    backgroundColor: Colors.bkg,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  otherTitleContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});

export default CartScreen;
