import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../../components/General/Header";
import SingleAddress from "../../../../components/General/SingleAddress";
import Colors from "../../../../constants/Colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button, FAB } from "react-native-paper";
import { useForm } from "react-hook-form";
import GetExtraLocationDetails from "../../../../components/Profile/GetExtraLocationDetails";
import * as profileActions from "../../../../store/actions/Profile";
import PicWithText from "../../../../components/General/PicWithText";
import fonts from "../../../../constants/fonts";
const AddressScreen = ({ navigation }) => {
  const addresses = useSelector((state) => state.Profile.locations);
  const token = useSelector((state) => state.Auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();
  const [editAddress, setEditAddress] = useState({
    _id: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const { handleSubmit, control, errors } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editAddress._id.length > 0) {
      refRBSheet.current.open();
    }
  }, [editAddress]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      let restAddress;
      restAddress = editAddress.address.split(",")[2];
      restAddress = editAddress.address.slice(
        editAddress.address.indexOf(restAddress)
      );

      setIsLoading(true);
      await dispatch(
        profileActions.editAddress(
          editAddress._id,
          `${data.building},${data.landmark},${restAddress}`,
          token
        )
      );

      setIsLoading(false);
      refRBSheet.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  if (addresses.length === 0) {
    return (
      <PicWithText>
        <Image
          source={{ uri: "https://img.icons8.com/nolan/2x/address.png" }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ fontSize: 18, fontFamily: fonts.Bold }}>
          Your saved addresses will be visible here
        </Text>
        <Button
          onPress={() => {
            navigation.navigate("AddAddress", {
              newAddress: "",
            });
          }}
          mode="outlined"
          color={Colors.tertiary}
          contentStyle={{ padding: 10 }}
          style={{ marginTop: 20 }}
        >
          Add one now!!
        </Button>
      </PicWithText>
    );
  }

  if (isLoading) {
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
          Hold on...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.headerContainer}>
        <Header text="My Addresses" textSize={25} />
      </View>
      <FlatList
        data={addresses}
        keyExtractor={(Item) => Item._id}
        renderItem={({ item }) => {
          return (
            <SingleAddress
              address={item.address}
              _id={item._id}
              setIsLoading={setIsLoading}
              setEditAddress={setEditAddress}
              latitude={item.latitude}
              longitude={item.longitude}
            />
          );
        }}
      />
      <FAB
        style={styles.fab}
        small={false}
        color="#fff"
        icon="plus"
        onPress={() => {
          navigation.navigate("AddAddress", {
            newAddress: "",
          });
        }}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.8)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <Text style={styles.simpleText}>Edit</Text>
        <GetExtraLocationDetails
          errors={errors}
          control={control}
          editAddress={editAddress}
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
    marginTop: 25,
  },
  simpleText: {
    fontSize: 24,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 15,
    fontStyle: "italic",
  },
  buttonStyle: {
    margin: 10,
    paddingVertical: 10,
    bottom: 0,
    position: "absolute",
    width: "95%",
    borderRadius: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.secondary,
  },
});

export default AddressScreen;
