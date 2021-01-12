import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Header from "../../../components/General/Header";
import Colors from "../../../constants/Colors";
import SubCategories from "../../../components/Home/SubCategories";

const CategoryScreen = ({ route }) => {
  const { title } = route.params;
  return (
    <ScrollView style={styles.container} centerContent={true}>
      <Header text={title} />
      <SubCategories title={title} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
});

export default CategoryScreen;
