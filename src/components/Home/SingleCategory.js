import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../constants/fonts";

const SingleCategory = ({ mainCategory, source, SubCategories }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainerStyle}>
        <Pressable
          onPress={async () => {
            navigation.navigate(`AllProducts`, {
              title: mainCategory,
              subCategory: true,
              categories: SubCategories,
            });
          }}
        >
          <Image
            resizeMode="contain"
            source={{
              uri: source,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontFamily: fonts.Light,
            marginHorizontal: 5,
            fontSize: 20,
            textAlign: "center",
            color: "black",
          }}
          numberOfLines={2}
        >
          {mainCategory}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    elevation: 10,
    borderRadius: 20,
    marginHorizontal: 6,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainerStyle: {
    height: 100,
    // borderWidth: 1,
    // alignItems: "center",
    paddingTop: 15,
  },
});

export default SingleCategory;
