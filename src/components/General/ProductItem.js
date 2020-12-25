import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button, Divider } from "react-native-paper";
import Colors from "../../constants/Colors";
import InputSpinner from "react-native-input-spinner";
import * as cartActions from "../../store/actions/Cart";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as profileActions from "../../store/actions/Profile";

const ProductItem = ({
  name,
  indianName,
  imageUrl,
  price,
  quantity,
  _id,
  category,
}) => {
  const [qty, setQty] = useState(0);
  const bookmarkIds = useSelector((state) =>
    state.Profile.bookmarks.filter((prod) => {
      return prod.productId === _id;
    })
  );
  const cart = useSelector((state) => state.Cart);
  const token = useSelector((state) => state.Auth.token);
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarkIds.length > 0 ? true : false
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (quantity >= 0) {
      setQty(quantity);
    }
  }, [quantity]);

  return (
    <>
      <View style={styles.container}>
        {token.length > 0 && (
          <TouchableOpacity
            style={styles.bookmarkIconStyle}
            onPress={async () => {
              setIsBookmarked(!isBookmarked);
              if (isBookmarked) {
                dispatch(profileActions.removeBookmark(_id, token));
              } else {
                dispatch(profileActions.addBookmark(_id, token));
              }
            }}
          >
            <Ionicons
              name={isBookmarked ? "leaf-sharp" : "leaf-outline"}
              size={24}
              color={Colors.sub}
            />
          </TouchableOpacity>
        )}
        <Image
          resizeMode="contain"
          source={{
            uri: imageUrl
              ? imageUrl
              : "https://th.bing.com/th/id/OIP.ouOFcEHOYh7Dj3JCmDUfhwAAAA?pid=Api&rs=1",
          }}
          style={styles.productImageStyle}
        />
        <View style={{ marginTop: 10, width: "60%" }}>
          <Text style={styles.nameStyle}>{name}</Text>

          <Text style={styles.indianNameStyle}>
            {indianName ? indianName : name}
          </Text>
          <View style={styles.priceContainerStyle}>
            <FontAwesome name="rupee" size={18} color="#888" />
            <Text style={styles.priceStyle}>99/kg</Text>
          </View>

          {qty === 0 ? (
            <Button
              style={{ alignSelf: "flex-end", marginRight: 15 }}
              color={Colors.tertiary}
              onPress={() => {
                if (token.length > 0) {
                  dispatch(cartActions.addProduct(_id, token));
                } else {
                  dispatch(
                    cartActions.addProductNoAuth(
                      _id,
                      cart.cartProducts,
                      cart.totalAmount
                    )
                  );
                }
                setQty(1);
              }}
            >
              Add
            </Button>
          ) : (
            <InputSpinner
              max={10}
              min={0}
              step={1}
              type="float"
              precision={2}
              height={20}
              rounded={false}
              showBorder={true}
              colorMax={Colors.tertiary}
              colorMin={Colors.tertiary}
              value={qty}
              onChange={(num) => {
                if (num > qty) {
                  if (token.length > 0) {
                    dispatch(cartActions.addProduct(_id, token));
                  } else {
                    dispatch(
                      cartActions.addProductNoAuth(
                        _id,
                        cart.cartProducts,
                        cart.totalAmount
                      )
                    );
                  }

                  setQty(num);
                } else if (num < qty) {
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
                  setQty(num);
                }
              }}
              style={styles.spinnerStyle}
              inputStyle={{
                width: 30,
                height: 35,
              }}
              colorLeft={Colors.tertiary}
              colorRight={Colors.tertiary}
              buttonStyle={{ width: 30, height: 35 }}
            />
          )}
        </View>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: 150,
    flexDirection: "row",
  },
  bookmarkIconStyle: { position: "absolute", right: "5%", top: "5%" },
  productImageStyle: {
    height: "100%",
    width: "40%",
    alignSelf: "center",
    borderWidth: 1,
  },
  nameStyle: { fontSize: 20, fontWeight: "bold", width: "80%" },
  indianNameStyle: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  priceContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  priceStyle: { fontSize: 18, fontStyle: "italic" },
  spinnerStyle: {
    marginTop: 10,
    alignSelf: "flex-end",
    width: 100,
  },
});

export default ProductItem;
