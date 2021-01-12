import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../constants/fonts";

const SingleCategory = ({ mainCategory, source, parent, subCategory }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainerStyle}>
        <Pressable
          onPress={async () => {
            if (parent) {
              navigation.navigate(`Category`, {
                title: mainCategory,
              }); //PARENT TRUE MEANS SELECTED A MAIN CATEGORY
              return;
            }
            navigation.navigate(`AllProducts`, {
              // CLICKED SUBCATEGORY
              title: subCategory,
              subCategory: true,
            });
          }}
        >
          <Image
            resizeMode="cover"
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
            textAlign: "center",
            color: "black",
          }}
          numberOfLines={2}
        >
          {subCategory ? subCategory : mainCategory}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 140,
    marginBottom: 5,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  imageContainerStyle: {
    borderRadius: 10,
    overflow: "hidden",
    height: 100,
  },
});

export default SingleCategory;
