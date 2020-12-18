import React, { useRef, useEffect, useState } from "react";
import { FlatList, Image, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Header from "../../../components/General/Header";
import ProductItem from "../../../components/General/ProductItem";
import Colors from "../../../constants/Colors";
import { Button } from "react-native-paper";
import CheckOut from "../../../components/Cart/CheckOut";
import ChooseLocationType from "../../../components/General/ChooseLocationType";

const CartScreen = ({ navigation }) => {
  const products = useSelector((state) => state.Cart.cartProducts);
  const allProducts = useSelector((state) => state.Products.products);
  const profileData = useSelector((state) => state.Profile);
  const amount = useSelector((state) => state.Cart.totalAmount);
  const [isVisible, setIsVisible] = useState(false);

  const cartProducts = products.map((prod) => {
    //GETTING ALL DETAILS OF A PRODUCT THROUGH ITS ID
    const productIndex = allProducts.findIndex(
      (product) => product._id === prod.productId
    );
    allProducts[productIndex].quantity = prod.quantity;
    return allProducts[productIndex];
  });
  console.log(cartProducts);

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
          source={require("../../../../assets/emptyCart.png")}
          style={{ height: "30%", width: "70%" }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
          Add something to continue... Some quote related to farmer ,for ex
          check swiggy
        </Text>
        <Button onPress={() => navigation.navigate("Home")}>Browse all</Button>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: Colors.bkg, flex: 1 }}>
      <Header
        text="Cart"
        style={{ marginHorizontal: 10, marginTop: 35 }}
        textSize={30}
      />
      <ChooseLocationType
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        inCart={true}
      />
      <FlatList
        data={vegetableProducts}
        sections={products}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          vegetableProducts.length > 0 && (
            <View
              style={{
                backgroundColor: Colors.bkg,
                height: 30,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontSize: 18 }}>Vegetables</Text>
            </View>
          )
        }
        ListFooterComponent={
          <FlatList
            data={fruitProducts}
            sections={products}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              fruitProducts.length > 0 && (
                <View
                  style={{
                    backgroundColor: Colors.bkg,
                    height: 30,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Fruits</Text>
                </View>
              )
            }
            ListFooterComponent={
              <FlatList
                data={nonVegProducts}
                sections={products}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                  nonVegProducts.length > 0 ? (
                    <View
                      style={{
                        backgroundColor: Colors.bkg,
                        height: 30,
                        justifyContent: "center",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>Meat</Text>
                    </View>
                  ) : null
                }
                ListFooterComponent={
                  <FlatList
                    data={grainProducts}
                    sections={products}
                    keyExtractor={(item) => item._id}
                    ListHeaderComponent={
                      grainProducts.length > 0 ? (
                        <View
                          style={{
                            backgroundColor: Colors.bkg,
                            height: 30,
                            justifyContent: "center",
                            paddingHorizontal: 20,
                          }}
                        >
                          <Text style={{ fontSize: 18 }}>Grains</Text>
                        </View>
                      ) : null
                    }
                    ListFooterComponent={
                      <View style={{ margin: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          Bill Details
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 15 }}>Item total</Text>
                          <Text>Rs {amount}</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 10,
                          }}
                        >
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
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 10,
                          }}
                        >
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            To pay
                          </Text>
                          <Text>Rs {amount + 70}</Text>
                        </View>
                      </View>
                    }
                    renderItem={({ item }) => {
                      return (
                        <ProductItem
                          name={item.name}
                          indianName={item.indianName}
                          imageUrl={item.imageUrl}
                          price={item.price}
                          quantity={item.quantity}
                          _id={item._id}
                          category="Fruits"
                        />
                      );
                    }}
                  />
                }
                renderItem={({ item }) => {
                  return (
                    <ProductItem
                      name={item.name}
                      indianName={item.indianName}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      quantity={item.quantity}
                      _id={item._id}
                      category="Non-Veg"
                    />
                  );
                }}
              />
            }
            renderItem={({ item }) => {
              return (
                <ProductItem
                  name={item.name}
                  indianName={item.indianName}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  quantity={item.quantity}
                  _id={item._id}
                  category="Fruits"
                />
              );
            }}
          />
        }
        renderItem={({ item }) => {
          return (
            <ProductItem
              name={item.name}
              indianName={item.indianName}
              imageUrl={item.imageUrl}
              price={item.price}
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
});

export default CartScreen;