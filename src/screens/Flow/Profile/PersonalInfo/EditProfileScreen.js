import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import Header from "../../../../components/General/Header";
import { useForm } from "react-hook-form";
import Colors from "../../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../../../../components/General/BackButton";

// import UserName from '../../../components/PersonalInfo/UserName';
// import ChangePhoneNumberButton from '../../../components/PersonalInfo/ChangePhoneNumberButton';
import DP from "../../../../components/Profile/DP";

const EditProfileScreen = ({ navigation }) => {
  const { control, handleSubmit, errors, getValues, setValue } = useForm();
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.Profile);
  const [image, setImage] = useState(`${profileData.imageURL}`);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // await dispatch(
      //   profileActions.updateUserName(data.userName, profileData.token),
      // );
      setIsLoading(false);
      navigation.navigate("PersonalInfo");
    } catch (error) {
      setIsLoading(false);
      return Alert.alert(
        "Something Went Wrong!",
        "Please check your internet connection",
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ]
      );
    }
  };
  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.tertiary} />
        <Text style={{ fontSize: 20, marginVertical: 15, fontStyle: "italic" }}>
          Saving credentials...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      centerContent={true}
      contentContainerStyle={{ flex: 1, backgroundColor: Colors.bkg }}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <Header text="Edit profile" textSize={30} />
      </View>
      <DP
        username={profileData.username}
        image={image}
        setIsLoading={setIsLoading}
        setImage={setImage}
        canEdit={true}
      />
      {/* <UserName control={control} errors={errors} /> */}
      {/* <ChangePhoneNumberButton phoneNumber={profileData.phoneNumber} /> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          theme={{ colors: { primary: "green" } }}
          label="Email"
          value={profileData.email}
          disabled={true}
        />
      </View>

      <View style={styles.saveButtonStyle}>
        <Button
          mode="contained"
          style={{ paddingVertical: 7 }}
          color={Colors.tertiary}
          onPress={handleSubmit(onSubmit)}
        >
          Save Changes
        </Button>
      </View>
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
  inputContainer: {
    marginHorizontal: 10,
    height: 60,
  },
  buttonContainer: {
    borderRadius: 30,
    overflow: "hidden",
    margin: 20,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 15,
  },
  saveButtonStyle: {
    width: "95%",
    borderRadius: 5,
    margin: 10,
    bottom: -90,
    position: "relative",
    left: 0,
    right: 0,
  },
  input: {
    color: "black",
    fontSize: 18,
    borderBottomWidth: 1,
    backgroundColor: Colors.bkg,
  },
});

export default EditProfileScreen;
