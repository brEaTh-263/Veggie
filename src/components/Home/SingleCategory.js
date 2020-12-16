import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SingleCategory = ({ mainCategory, source, parent, subCategory }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={async () => {
          if (parent) {
            navigation.navigate(`${mainCategory}Category`); //PARENT TRUE MEANS SELECTED A MAIN CATEGORY
            return;
          }
          navigation.navigate(`${mainCategory}Products`, {
            // CLICKED SUBCATEGORY
            title: subCategory,
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
        <View style={styles.titleContainer}>
          <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
            {subCategory ? subCategory : mainCategory}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    height: "50%",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    marginBottom: 5,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  titleContainer: {
    backgroundColor: "white",
    opacity: 0.7,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    width: "100%",
    height: "20%",
    justifyContent: "center",
  },
});

export default SingleCategory;
