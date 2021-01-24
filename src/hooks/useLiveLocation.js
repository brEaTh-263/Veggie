import { useState } from "react";
import * as Location from "expo-location";

export default () => {
  const [error, setError] = useState(false);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      // console.log(status);
      if (status !== "granted") {
        throw new Error();
      }
      setError(false);
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
