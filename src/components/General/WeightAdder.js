import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import { Button } from "react-native-paper";
import InputSpinner from "react-native-input-spinner";

const WeightAdder = ({ price, closeSheet, _id }) => {
  const [qty, setQty] = React.useState(0);
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
          ${price * qty}
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

export default WeightAdder;
