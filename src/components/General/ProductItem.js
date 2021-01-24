import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../store/actions/Profile";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import fonts from "../../constants/fonts";
import ProductAdder from "./ProductAdder";
import ProductItemSheet from "./ProductItemSheet";
import { set } from "react-native-reanimated";

const ProductItem = ({
  name,
  indianName,
  imageUrl,
  priceKg,
  priceQty,
  quantity,
  _id,
  isKg,
  category,
}) => {
  const refRBSheet = useRef();
  const bookmarkIds = useSelector((state) =>
    state.Profile.bookmarks.filter((prod) => {
      return prod.productId === _id;
    })
  );
  const token = useSelector((state) => state.Auth.token);
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarkIds.length > 0 ? true : false
  );

  const openSheet = () => {
    refRBSheet.current.open();
  };

  const dispatch = useDispatch();

  const closeSheet = () => {
    refRBSheet.current.close();
  };

  return (
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
        resizeMode="center"
        style={styles.imageStyle}
        source={{
          uri: imageUrl
            ? imageUrl
            : "https://bsmedia.business-standard.com/_media/bs/theme/faq_view_all/images/no-result-found.png",
        }}
      />
      <View style={{ marginTop: 15, marginLeft: 10 }}>
        <Text style={{ color: Colors.primary, fontSize: 24 }}>${priceKg}</Text>
        <Text style={{ color: "black", fontSize: 16 }}>{name}</Text>
        <Text style={{ color: "#888", fontSize: 13 }}>
          {indianName ? indianName : name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => openSheet()}
        style={styles.cartButtonContainerStyle}
      >
        {quantity > 0 ? (
          <Text style={{ fontFamily: fonts.Regular, color: "#fff" }}>
            {isKg ? `${quantity}(in kg)` : `${quantity}(in qty)`}
          </Text>
        ) : (
          <AntDesign name="shoppingcart" size={24} color="#fff" />
        )}
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={520}
        animationType="fade"
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.8)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        }}
      >
        <ProductItemSheet
          _id={_id}
          closeSheet={closeSheet}
          imageUrl={imageUrl}
          indianName={indianName}
          isBookmarked={isBookmarked}
          isKg={isKg}
          name={name}
          priceKg={priceKg}
          priceQty={priceQty}
          quantity={quantity}
          setIsBookmarked={setIsBookmarked}
          token={token}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: 270,
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginVertical: 10,
  },
  bookmarkIconStyle: { position: "absolute", right: "5%", top: "3%" },
  scene: {
    height: 100,
  },
  imageStyle: {
    width: "80%",
    height: 100,
    marginTop: 20,
    alignSelf: "center",
  },

  cartButtonContainerStyle: {
    borderRadius: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 7,
    justifyContent: "center",
  },
});

export default ProductItem;
