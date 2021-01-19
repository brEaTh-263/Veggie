import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import RecipeIcons from "./RecipeIcons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import fonts from "../../constants/fonts";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import InputSpinner from "react-native-input-spinner";

import Colors from "../../constants/Colors";
import RBSheet from "react-native-raw-bottom-sheet";

const RecipeItem = ({ item }) => {
  const token = useSelector((state) => state.Auth.token);
  const refRBSheet = useRef();
  const [qty, setQty] = useState(2);

  const closeSheet = () => {
    refRBSheet.current.close();
  };
  return (
    <View style={styles.cardContainer}>
      {token.length > 0 && (
        <TouchableOpacity
          style={styles.bookmarkIconStyle}
          onPress={async () => {}}
        >
          <Ionicons name="leaf-sharp" size={24} color={Colors.primary} />
        </TouchableOpacity>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          resizeMode="cover"
          source={require("../../../assets/recipe.png")}
          style={{
            width: "100%",
            height: 150,
            alignItems: "center",
          }}
        />
        <Text
          style={{
            marginTop: 25,
            fontSize: 18,
            textTransform: "uppercase",
            fontFamily: fonts.Bold,
            color: Colors.primary,
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <RecipeIcons time={item.duration} />
          <RecipeIcons difficulty={item.difficulty} />
          <RecipeIcons mode={item.mode} />
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: Colors.primary,
          overflow: "hidden",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        onPress={() => refRBSheet.current.open()}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            height: 30,
          }}
        >
          Add to cart
        </Text>
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <View
          style={{
            alignItems: "center",
            width: "100%",
            flex: 1,
          }}
        >
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              textTransform: "uppercase",
              fontFamily: fonts.Bold,
              color: "white",
              paddingHorizontal: 10,
              backgroundColor: Colors.primary,
              textAlign: "center",
            }}
          >
            LOW FAT
          </Text>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <RecipeIcons mode={item.mode} />
            <RecipeIcons difficulty={item.difficulty} />
            <RecipeIcons time={item.duration} />
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 25,
              textTransform: "uppercase",
              fontFamily: fonts.Bold,
              color: "black",
            }}
          >
            {item.name}
          </Text>
          <Image
            resizeMode="contain"
            source={require("../../../assets/recipe.png")}
            style={{
              width: "100%",
              height: 150,
              alignItems: "center",
            }}
          />
          <InputSpinner
            max={10}
            min={2}
            step={2}
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
            style={{ alignItems: "center", width: 200, marginTop: 20 }}
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
          <Text
            style={{
              fontSize: 20,
              textTransform: "uppercase",
              fontFamily: fonts.Regular,
            }}
          >
            serves
          </Text>
          <View
            style={{
              position: "absolute",
              bottom: 10,
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
              ${item.price * qty}
            </Text>
            <Button
              onPress={() => {
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
                closeSheet();
              }}
              style={{ backgroundColor: "#fff", padding: 10, borderRadius: 20 }}
            >
              <MaterialIcons name="delete" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  cardContainer: {
    width: 280,
    marginHorizontal: 10,
    height: 300,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 20,
    opacity: 20,
  },
  textStyle: {
    fontSize: 13,
    marginLeft: 5,
  },
  bookmarkIconStyle: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
