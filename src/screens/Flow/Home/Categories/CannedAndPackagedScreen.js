import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";

import { Button } from "react-native-paper";

const CannedAndPackagedScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} centerContent={true}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Canned and Packaged" textSize={20} />
      </View>
      <Button
        mode="contained"
        style={{ marginHorizontal: 15 }}
        color={Colors.tertiary}
        onPress={() =>
          navigation.navigate("AllProducts", {
            title: "Canned And Packaged",
            subCategory: false,
          })
        }
      >
        View All
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
});

export default CannedAndPackagedScreen;
