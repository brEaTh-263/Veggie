import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../constants/fonts";

const CardButton = ({ title, icon, navScreen, color }) => {
  const navigation = useNavigation();

  return (
    <Card style={[styles.cardContainer, { backgroundColor: color }]}>
      <TouchableOpacity
        onPress={() => {
          if (navScreen) {
            navigation.navigate(navScreen);
          }
        }}
        style={styles.cardStyle}
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              alignItems: "center",
              fontFamily: fonts.Bold,
              color: "#fff",
              fontSize: 23,
              textTransform: "uppercase",
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "40%",
    height: "45%",
    elevation: 5,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  cardStyle: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default CardButton;
