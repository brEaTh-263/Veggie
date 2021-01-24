import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import { Button } from "react-native-paper";
const ServerDown = ({ fetchData }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{
          uri:
            "https://image.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg",
        }}
        style={{ width: 200, height: 300 }}
      />
      <Text style={{ fontSize: 18, fontFamily: fonts.Bold }}>
        Page not found!
      </Text>
      <Button
        onPress={() => {
          fetchData();
        }}
        mode="outlined"
        color={Colors.tertiary}
        contentStyle={{ padding: 10 }}
        style={{ marginTop: 20 }}
      >
        Try again
      </Button>
    </View>
  );
};

export default ServerDown;

const styles = StyleSheet.create({});
