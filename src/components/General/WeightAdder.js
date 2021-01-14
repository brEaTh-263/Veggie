import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import { Button } from "react-native-paper";
import InputSpinner from "react-native-input-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/Cart";
import { MaterialIcons } from "@expo/vector-icons";
const WeightAdder = ({ priceKg, closeSheet, _id, quantity, isKg }) => {
  const [qty, setQty] = React.useState(0);
  const token = useSelector((state) => state.Auth.token);
  const cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isKg) {
      setQty(quantity);
    }
  }, [setQty, isKg]);
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
      <View
        style={{
          position: "absolute",
          bottom: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          left: 0,
        }}
      >
        <Text
          style={{
            marginRight: 30,
            marginLeft: 25,
            fontSize: 25,
            color: Colors.primary,
            fontWeight: "bold",
          }}
        >
          ${priceKg * qty}
        </Text>
        <Button
          onPress={() => {
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
          }}
          mode="contained"
          icon="cart-outline"
          color={Colors.primary}
          contentStyle={{
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
          style={{
            borderRadius: 20,

            marginLeft: 20,
            marginRight: 10,
          }}
        >
          Add to cart
        </Button>
        <TouchableOpacity
          onPress={() => {
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
          }}
          style={{ backgroundColor: "#fff", padding: 10, borderRadius: 20 }}
        >
          <MaterialIcons name="delete" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    height: "100%",
    marginTop: 10,
  },
});

export default WeightAdder;
