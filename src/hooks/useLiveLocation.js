import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { googleApiKey } from "../config";
import * as Location from "expo-location";

export default () => {
  const [error, setError] = useState(false);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      let { locationServicesEnabled } = await Location.getProviderStatusAsync();
      if (status !== "granted") {
        setError(true);
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return [getCurrentLocation, error];
};
