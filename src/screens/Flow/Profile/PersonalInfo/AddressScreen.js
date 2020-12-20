import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import BackButton from "../../../../components/General/BackButton";
import Header from "../../../../components/General/Header";
// import SingleAddress from '../../../components/Location/SingleAddress';
import AddLocation from "../../../../components/Profile/AddLocation";
import Colors from "../../../../constants/Colors";

const AddressScreen = ({ navigation }) => {
  const addresses = useSelector((state) => state.Profile.locations);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.bkg,
        }}
      >
        <ActivityIndicator size="small" color={Colors.tertiary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="My Addresses" textSize={30} />
      </View>
      <AddLocation navigation={navigation} />
      {/* <FlatList
          data={addresses}
          keyExtractor={(Item) => Item._id}
          renderItem={({item}) => {
            return (
              <SingleAddress
                address={item.address}
                _id={item._id}
                setIsLoading={setIsLoading}
              />
            );
          }}
        /> */}
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
    marginTop: 35,
  },
});

export default AddressScreen;
