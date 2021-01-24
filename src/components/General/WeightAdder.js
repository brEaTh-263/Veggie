import React, { useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import InputSpinner from "react-native-input-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/Cart";
import AddInCartButton from "./AddInCartButton";
const WeightAdder = ({ priceKg, closeSheet, _id, quantity, isKg }) => {
  const [qty, setQty] = useState(0);
  const token = useSelector((state) => state.Auth.token);
  const cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isKg) {
      setQty(quantity);
    }
  }, [setQty, isKg]);

  const addToCart = () => {
    if (qty === 0) {
      return ToastAndroid.showWithGravityAndOffset(
        "Please select a valid weight",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    if (token.length > 0) {
      dispatch(cartActions.addProduct(_id, token, qty, true));
    } else {
      dispatch(
        cartActions.addProductNoAuth(
          _id,
          cart.cartProducts,
          cart.totalAmount,
          qty,
          true
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

  const showValue = () => {
    return `$ ${priceKg * qty}`;
  };

  return (
    <View style={styles.scene}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InputSpinner
          max={10}
          min={0}
          step={0.5}
          type="float"
          precision={2}
          height={20}
          rounded={true}
          showBorder={false}
          colorMax={Colors.tertiary}
          colorMin={Colors.tertiary}
          value={qty}
          onChange={(num) => {
            setQty(num);
          }}
          style={{ alignItems: "center", width: 200 }}
          inputStyle={{ fontSize: 24, height: 40, fontFamily: fonts.Regular }}
          textColor={Colors.tertiary}
          buttonTextColor={Colors.primary}
          buttonPressStyle={{
            backgroundColor: "#c0c0c0",
            width: 60,
            height: 60,
          }}
          buttonStyle={{ width: 60, height: 60, backgroundColor: "#fff" }}
        />
      </View>
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
    backgroundColor: Colors.bkg,
  },
});

export default WeightAdder;
