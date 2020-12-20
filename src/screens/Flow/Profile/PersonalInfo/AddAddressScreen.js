import React, { useState, useRef, useEffect, useCallback } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { ActivityIndicator } from "react-native";
import Colors from "../../../../constants/Colors";
import AddressName from "../../../../components/General/AddressName";
import { useForm, Controller } from "react-hook-form";
import { Button, Searchbar, List, Divider } from "react-native-paper";
// import Tag from '../../../components/Location/Tag';
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../../../../store/actions/Profile";
import { MaterialIcons } from "@expo/vector-icons";
import GetExtraLocationDetails from "../../../../components/Profile/GetExtraLocationDetails";
import BackButton from "../../../../components/General/BackButton";
import { TouchableOpacity } from "react-native";
import useLiveLocation from "../../../../hooks/useLiveLocation";
import useReadLocation from "../../../../hooks/useReadLocation";
const AddAddressScreen = ({ navigation, route }) => {
  const { newCoords } = route.params;

  const [region, setRegion] = useState({
    latitude: newCoords ? newCoords.lat : 23.155,
    longitude: newCoords ? newCoords.lng : 87.655,
    latitudeDelta: 0.000922,
    longitudeDelta: 0.000421,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const { control, handleSubmit, errors } = useForm();
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const tokenId = useSelector((state) => state.Auth.token);

  const [getCurrentLocation, errorLive] = useLiveLocation();
  const [getReadableLocation, errorRead] = useReadLocation();

  const getLocation = useCallback(async () => {
    setIsLoading(true);
    const { latitude, longitude } = await getCurrentLocation();
    const { formattedAddress } = await getReadableLocation(latitude, longitude);

    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0005,
      longitudeDelta: 0.0005,
    });
    setAddress(formattedAddress);
    setIsLoading(false);
  }, [setIsLoading, setAddress]);

  useEffect(() => {
    if (newCoords) {
      return;
    }
    console.log("Live Called");
    getLocation();
  }, [setAddress]);

  const onRegionChangeComplete = useCallback(async (region) => {
    setRegion(region);
    setAddressLoading(true);
    const { formattedAddress } = await getReadableLocation(
      region.latitude,
      region.longitude
    );
    setAddressLoading(false);
    setAddress(formattedAddress);
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(
        profileActions.addAddress(
          `${data.building},${data.landmark},${address}`,
          tokenId,
          region.latitude,
          region.longitude
        )
      );
      setIsLoading(false);
      navigation.navigate("Address");
    } catch (error) {
      setIsLoading(false);
      return Alert.alert(
        "Something went wrong",
        "Address was not saved.Please try again!",
        [{ text: "Okay" }]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={(styles.container, { justifyContent: "center", flex: 1 })}>
        <ActivityIndicator size="large" color={Colors.tertiary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={50}
    >
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
        />
      </View>
      <View style={styles.backButtonStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("Address")}>
          <BackButton />
        </TouchableOpacity>
      </View>
      <View style={styles.pinContainer}>
        <Image
          style={styles.marker}
          source={require("../../../../../assets/location-pin.png")}
        />
      </View>
      <View style={styles.liveIconContainerStyle}>
        <TouchableWithoutFeedback onPress={getLocation}>
          <MaterialIcons name="my-location" size={24} color="red" />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.restContainer}>
        <View style={styles.addressContainerStyle}>
          <View style={styles.addressStyle}>
            <AddressName address={address} addressLoading={addressLoading} />
          </View>
          <Button
            style={styles.changeButtonStyle}
            color={Colors.tertiary}
            onPress={() => {
              navigation.push("SearchLocations", {
                addressOnly: false,
                inCart: false,
              });
            }}
          >
            Change
          </Button>
        </View>

        <Button
          style={styles.buttonStyle}
          mode="contained"
          color={Colors.tertiary}
          onPress={() => refRBSheet.current.open()}
        >
          Confirm and Proceed
        </Button>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={300}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: Colors.bkg,
            },
          }}
        >
          <Text style={styles.simpleText}>Add some precise details</Text>
          <GetExtraLocationDetails
            errors={errors}
            control={control}
            editAddress={false}
          />

          <Button
            style={styles.buttonStyle}
            mode="contained"
            color={Colors.tertiary}
            onPress={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </RBSheet>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backButtonStyle: { position: "absolute", top: "3%", left: "3%" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  mapStyle: {
    // flex: 1,
    width: "100%",
    height: "100%",
  },

  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  region: {
    color: "#fff",
    lineHeight: 20,
    margin: 20,
  },
  simpleText: {
    fontSize: 24,
    marginHorizontal: 15,
    marginVertical: 10,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  buttonStyle: {
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 3,
    marginBottom: 5,
    width: "90%",
    alignSelf: "center",
  },
  mapContainer: { width: "100%", height: "78%" },
  pinContainer: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  liveIconContainerStyle: {
    right: "5%",
    position: "absolute",
    top: "73%",
    padding: 7,
    borderRadius: 31,
    backgroundColor: "white",
  },
  restContainer: {
    width: "100%",
    height: "22%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  addressContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 15,
  },
  addressStyle: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  changeButtonStyle: { right: "20%", top: "2%", marginBottom: 5 },
});

export default AddAddressScreen;
