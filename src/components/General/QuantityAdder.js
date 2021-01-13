import * as React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/Cart";
import { MaterialIcons } from "@expo/vector-icons";
const QuantityAdder = ({ priceQty, closeSheet, _id, quantity, isKg }) => {
  const token = useSelector((state) => state.Auth.token);

  const cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");

  React.useEffect(() => {
    if (!isKg) {
      setValue(quantity.toString());
    }
  }, [isKg, setValue]);
  const data = [
    {
      number: "1",
    },
    {
      number: "2",
    },
    {
      number: "3",
    },
    {
      number: "4",
    },
    {
      number: "5",
    },
    {
      number: "6",
    },
    {
      number: "7",
    },
    {
      number: "8",
    },
    {
      number: "9",
    },
    {
      number: "10",
    },
  ];
  const x = value * 1;
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
                console.log("Pressed");
                setValue(item.number);
              }}
              style={{
                backgroundColor: item.number === value ? "#c0c0c0" : "#fff",
                marginHorizontal: 10,
                height: 60,
                width: 60,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: fonts.Bold,
                  zIndex: 1111111,
                }}
              >
                {item.number}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
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
          ${priceQty * x}
        </Text>
        <Button
          onPress={() => {
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
            marginRight: 20,
            marginLeft: 20,
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

export default QuantityAdder;
