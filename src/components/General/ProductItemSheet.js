import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import ProductAdder from "./ProductAdder";
import * as profileActions from "../../store/actions/Profile";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const ProductItemSheet = ({
  imageUrl,
  name,
  indianName,
  priceKg,
  priceQty,
  closeSheet,
  _id,
  quantity,
  isKg,
  setIsBookmarked,
  isBookmarked,
  token,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={{ justifyContent: "flex-start", flex: 1 }}>
      <Image
        resizeMode="contain"
        style={styles.imageStyleSheet}
        source={{
          uri: imageUrl
            ? imageUrl
            : "https://bsmedia.business-standard.com/_media/bs/theme/faq_view_all/images/no-result-found.png",
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.indianNameStyle}>
          {indianName ? indianName : name}
        </Text>
      </View>
      <View style={{ marginTop: 15 }} />
      <ProductAdder
        priceKg={priceKg}
        priceQty={priceQty}
        closeSheet={closeSheet}
        _id={_id}
        quantity={quantity}
        isKg={isKg}
      />
      {token.length > 0 && (
        <TouchableOpacity
          style={{ position: "absolute", right: "10%", top: "1%" }}
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
    </View>
  );
};

export default ProductItemSheet;

const styles = StyleSheet.create({
  imageStyleSheet: {
    width: "90%",
    height: 200,
    alignSelf: "center",
  },
  titleContainer: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nameStyle: {
    color: Colors.primary,
    fontSize: 28,
    fontFamily: fonts.Regular,
  },
  indianNameStyle: { color: "#888", fontSize: 20, fontStyle: "italic" },
});
