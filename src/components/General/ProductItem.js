import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card, Avatar, Button, Divider } from "react-native-paper";
import Colors from "../../constants/Colors";
import InputSpinner from "react-native-input-spinner";
// import * as cartActions from '../../store/actions/Cart';
import { useDispatch, useSelector } from "react-redux";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
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
  // const bookmarkIds = useSelector((state) =>
  //   state.Profile.bookmarks.filter((prod) => {
  //     return prod.productId === _id;
  //   }),
  // );
  // console.log(bookmarkIds);
  const token = useSelector((state) => state.Profile.token);
  // const [isBookmarked, setIsBookmarked] = useState(
  //   bookmarkIds.length > 0 ? true : false,
  // );
  const dispatch = useDispatch();
  useEffect(() => {
    if (quantity >= 0) {
      setQty(quantity);
    }
  }, [quantity]);

  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          height: 150,
          flexDirection: "row",
        }}
      >
        {/* <TouchableOpacity
          style={{position: 'absolute', right: '5%', top: '5%'}}
          onPress={async () => {
            // console.log("Pressed");
            setIsBookmarked(!isBookmarked);
            if (isBookmarked) {
              dispatch(profileActions.removeBookmark(_id, token));
            } else {
              dispatch(profileActions.addBookmark({_id}, token));
            }
          }}>
          <Fontisto
            name={isBookmarked ? 'bookmark-alt' : 'bookmark'}
            size={24}
            color="black"
          />
        </TouchableOpacity> */}
        <Image
          resizeMode="contain"
          source={{
            uri: imageUrl
              ? imageUrl
              : "https://th.bing.com/th/id/OIP.ouOFcEHOYh7Dj3JCmDUfhwAAAA?pid=Api&rs=1",
          }}
          style={{
            height: "100%",
            width: "40%",
            alignSelf: "center",
            borderWidth: 1,
          }}
        />
        <View style={{ marginTop: 10, width: "60%" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", width: "80%" }}>
            {name}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "#888",
              marginTop: 5,
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            {indianName ? indianName : name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="rupee" size={18} color="#888" />
            <Text style={{ fontSize: 18, fontStyle: "italic" }}>99/kg</Text>
          </View>

          {qty === 0 ? (
            <Button
              style={{ alignSelf: "flex-end", marginRight: 15 }}
              color={Colors.tertiary}
              onPress={() => {
                // dispatch(cartActions.addProduct(_id, token));
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
                  // dispatch(cartActions.addProduct(_id, token));
                  setQty(num);
                } else if (num < qty) {
                  // dispatch(cartActions.removeProduct(_id, token));
                  setQty(num);
                }
              }}
              style={{
                marginTop: 10,
                alignSelf: "flex-end",
                width: 100,
                // justifyContent: "flex-start",
              }}
              inputStyle={{
                width: 30,
                height: 35,
                // borderWidth: 1,
                // top: 10,
                // alignItems: 'center',
                // justifyContent: 'center',
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

export default ProductItem;
