import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import AddressInBullet from "./SavedAddressesInBullet";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../../store/actions/Profile";
import { useNavigation } from "@react-navigation/native";

const AddressDialog = ({
  addressDialogVisible,
  setAddressDialogVisible,
  setIsVisible,
  inCart,
}) => {
  const navigation = useNavigation();
  const addresses = useSelector((state) => state.Profile.locations);
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  let selectedAddress = addresses.filter((address) => address._id === value);

  const showChooseLocationTypeDialogHandler = () => {
    setAddressDialogVisible(false);
    setIsVisible(true);
  };

  const getSelectedAddress = () => {
    dispatch(
      profileActions.getSelectedAddress(selectedAddress[0].address, {
        lat: selectedAddress[0].latitude,
        lng: selectedAddress[0].longitude,
      })
    );
    setAddressDialogVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={addressDialogVisible}
          onDismiss={showChooseLocationTypeDialogHandler}
          style={styles.dialogStyle}
        >
          <View style={styles.contentStyle}>
            <Image
              source={require("../../../assets/map.png")}
              style={styles.imageStyle}
            />
          </View>
          <Text style={styles.title}>Saved Addresses</Text>
          <Text style={styles.subtitle}>
            Please choose one of the following to ensure hassle free experience
          </Text>

          <AddressInBullet
            getSelectedAddress={getSelectedAddress}
            value={value}
            setValue={setValue}
          />
          <Button
            icon="magnify"
            color="black"
            onPress={() => {
              //PENDING
            }}
          >
            Search for a location
          </Button>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <Button
              color={Colors.tertiary}
              onPress={() => {
                if (!value)
                  //NOT CHOSEN ANY ADDRESS
                  return;

                getSelectedAddress();
              }}
              icon="check"
            >
              Done
            </Button>
            <Button
              onPress={showChooseLocationTypeDialogHandler}
              color="black"
              icon="arrow-left-circle"
            >
              Back
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  SingleAddress: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",

    alignItems: "center",
  },
  button: { width: "100%" },
  contentStyle: {
    // borderWidth: 1,

    borderRadius: 30,
    // padding: 15,
    backgroundColor: Colors.bkg,
    width: 60,
    alignSelf: "center",
  },
  dialogStyle: { borderRadius: 10, paddingTop: 30 },
  imageStyle: { width: 60, height: 60, borderWidth: 1 },
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
});

export default AddressDialog;
