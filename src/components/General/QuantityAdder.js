import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/Cart";
import AddInCartButton from "./AddInCartButton";
import { data } from "../../raw_data";
const QuantityAdder = ({ priceQty, closeSheet, _id, quantity, isKg }) => {
  const token = useSelector((state) => state.Auth.token);

  const cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (!isKg) {
      setValue(quantity.toString());
    }
  }, [isKg, setValue]);

  const x = value * 1;

  const showValue = () => {
    return `$ ${priceQty * x}`;
  };

  const addToCart = () => {
    if (value === "0") {
      return ToastAndroid.showWithGravityAndOffset(
        "Please select a valid quantity",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    if (token.length > 0) {
      dispatch(cartActions.addProduct(_id, token, value * 1, false));
    } else {
      dispatch(
        cartActions.addProductNoAuth(
          _id,
          cart.cartProducts,
          cart.totalAmount,
          value * 1,
          false
        )
      );
    }
    closeSheet();
  };

  const removeFromCart = () => {
    if (token.length > 0) {
      dispatch(cartActions.removeProduct(_id, token));
    } else {
      dispatch(
        cartActions.removeProductNoAuth(
          _id,
          cart.cartProducts,
          cart.totalAmount
        )
      );
    }
    closeSheet();
  };
  return (
    <View style={[styles.scene]}>
      <FlatList
        keyExtractor={(item) => item.number}
        horizontal={true}
        data={data}
        contentContainerStyle={{ height: 80, borderWidth: 10 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setValue(item.number);
              }}
              style={[
                styles.buttonContainer,
                { backgroundColor: item.number === value ? "#c0c0c0" : "#fff" },
              ]}
            >
              <Text style={styles.numberStyle}>{item.number}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <AddInCartButton
        showValue={showValue}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    height: "100%",
    paddingTop: 10,
    backgroundColor: "#f3f5f7",
  },
  buttonContainer: {
    marginHorizontal: 10,
    height: 60,
    width: 60,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  numberStyle: {
    color: Colors.primary,
    fontFamily: fonts.Bold,
    zIndex: 1111111,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    left: 0,
  },
});

export default QuantityAdder;
