import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/Auth";

const InitialScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("tokenId");
      if (token) {
        try {
          await dispatch(authActions.autoLogIn(token));
          dispatch(authActions.setDidTryAutoLogin());
        } catch (error) {
          dispatch(authActions.setDidTryAutoLogin());
        }
      } else {
        dispatch(authActions.setDidTryAutoLogin());
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text>Trying to log in..</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default InitialScreen;
