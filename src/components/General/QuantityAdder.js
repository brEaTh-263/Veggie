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

const QuantityAdder = ({ price, closeSheet, _id }) => {
  const [value, setValue] = React.useState("1");
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
          right: 0,
        }}
      >
        <Text
          style={{
            marginHorizontal: 30,
            fontSize: 25,
            color: Colors.primary,
            fontWeight: "bold",
          }}
        >
          ${price * x}
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

            marginHorizontal: 30,
          }}
        >
          Add to cart
        </Button>
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
