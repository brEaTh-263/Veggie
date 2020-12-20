import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Portal, Dialog, Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import * as profileActions from "../../store/actions/Profile";
import { useDispatch, useSelector } from "react-redux";
import useLiveLocation from "../../hooks/useLiveLocation";
import useReadLocation from "../../hooks/useReadLocation";
import AddressDialog from "./AddressDialog";

const ChooseLiveOrOtherLocation = ({ isVisible, setIsVisible, inCart }) => {
  //incart TO KNOW FROM WHERE THIS DIALOG POPPED UP
  // IT WILL HELP IN KNOWING WHERE TO NAVIGATE(CART OR HOME PAGE)
  const dispatch = useDispatch();
  const address = useSelector(
    (state) => state.Profile.selectedLocation.address
  );
  const [addressDialogVisible, setAddressDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getCurrentLocation, errorMsgFromLiveLocation] = useLiveLocation();
  const [getReadableLocation, errorMsgFromReadableLocation] = useReadLocation();

  const fetchLiveLocationHandler = async () => {
    setIsLoading(true);
    const { latitude, longitude } = await getCurrentLocation();

    const { formattedAddress } = await getReadableLocation(latitude, longitude);
    console.log(errorMsgFromLiveLocation);
    if (errorMsgFromLiveLocation || errorMsgFromReadableLocation) {
      setIsLoading(false);
      return Alert.alert("Something went wrong", "Please try again", [
        { text: "Okay" },
      ]);
    }

    dispatch(
      profileActions.getSelectedAddress(formattedAddress, {
        lat: latitude,
        lng: longitude,
      })
    );
    setIsLoading(false);
  };

  const showAddressDialogHandler = () => {
    setIsVisible(false);
    setAddressDialogVisible(true);
  };

  return (
    <View>
      <Portal>
        <Dialog
          dismissable={address.length}
          style={styles.dialogStyle}
          visible={isVisible}
          onDismiss={() => {
            setIsVisible(false);
          }}
        >
          <View style={styles.contentStyle}>
            <Image
              source={require("../../../assets/locationMarker.png")}
              resizeMode="center"
              style={styles.imageStyle}
            />
          </View>
          <Text style={styles.title}>Location</Text>
          <Text style={styles.subtitle}>
            Please choose one of the following to ensure hassle free experience
          </Text>

          <Dialog.Actions
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onPress={fetchLiveLocationHandler}
              style={styles.button}
              color={Colors.tertiary}
              icon="crosshairs-gps"
              loading={isLoading}
            >
              Get Live Location
            </Button>
            <Button
              onPress={showAddressDialogHandler}
              style={styles.button}
              color="black"
              icon="magnify"
            >
              Select location manually
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <AddressDialog
        setAddressDialogVisible={setAddressDialogVisible}
        addressDialogVisible={addressDialogVisible}
        setIsVisible={setIsVisible}
        inCart={inCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 18,
  },
  subtitle: {
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: 10,
  },
  SingleAddress: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",

    alignItems: "center",
  },
  button: { width: "100%" },
  contentStyle: {
    borderRadius: 30,

    backgroundColor: Colors.bkg,
    width: 60,
    alignSelf: "center",
  },
  dialogStyle: { borderRadius: 10, paddingTop: 30 },
  imageStyle: { width: 60, height: 60, borderWidth: 1 },
});

export default ChooseLiveOrOtherLocation;
