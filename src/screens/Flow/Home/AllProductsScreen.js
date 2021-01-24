import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  BackHandler,
  Text,
  InteractionManager,
  ActivityIndicator,
} from "react-native";
import Colors from "../../../constants/Colors";
import Header from "../../../components/General/Header";
import fonts from "../../../constants/fonts";
import { useFocusEffect, StackActions } from "@react-navigation/native";
import AllProducts from "../../../components/Home/AllProducts";
import { TabView, TabBar } from "react-native-tab-view";

const AllProductsScreen = ({ route, navigation }) => {
  const { title, subCategory, categories } = route.params;
  const [screenLoaded, setScreenLoaded] = useState(false);
  let editedCategories = categories.map((cat) => {
    return {
      key: cat.name,
      title: cat.name,
    };
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(editedCategories);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setScreenLoaded(true);
    });
  });

  const initialLayout = { width: Dimensions.get("window").width };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      labelStyle={{
        textTransform: "capitalize",
        fontFamily: fonts.Bold,
        fontSize: 10,
      }}
      tabStyle={{ width: 85, height: 60 }}
      style={{ backgroundColor: "#fff" }}
      inactiveColor={Colors.tertiary}
      activeColor={Colors.primary}
      pressColor={Colors.sub}
      pressOpacity={0.1}
      indicatorStyle={{ backgroundColor: Colors.tertiary }}
    />
  );

  const renderScene = ({ route, jumpTo }) => {
    return (
      <AllProducts
        category={route.title}
        subCategory={subCategory}
        title={title}
      />
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        const jumpToAction = StackActions.replace("Home");
        navigation.dispatch(jumpToAction);
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  if (!screenLoaded) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: Colors.bkg,
        }}
      >
        <ActivityIndicator size="large" color={Colors.tertiary} />
        <Text style={{ fontSize: 20, marginVertical: 15, fontStyle: "italic" }}>
          Loading products
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header text={title} />
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={initialLayout}
        renderScene={renderScene}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
});

export default AllProductsScreen;
