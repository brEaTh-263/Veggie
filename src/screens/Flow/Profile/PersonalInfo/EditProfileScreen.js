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
import * as profileActions from "../../../../store/actions/Profile";
import Username from "../../../../components/Profile/Username";
import ChangePhoneNumberButton from "../../../../components/Profile/ChangePhoneNumberButton";
import DP from "../../../../components/Profile/DP";

const EditProfileScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.Profile);
  const [image, setImage] = useState(`${profileData.imageURL}`);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await dispatch(
        profileActions.updateUsername(data.userName, profileData.token)
      );
      navigation.navigate("PersonalInfo");
    } catch (error) {
      console.log(error);
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
    <ScrollView centerContent={true} contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.navigate("PersonalInfo")}
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
      <Username control={control} errors={errors} />
      <ChangePhoneNumberButton phoneNumber={profileData.phoneNumber} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          theme={{ colors: { primary: "green" } }}
          label="Email"
          value={profileData.email}
          disabled={true}
        />
      </View>

      <Button
        mode="contained"
        style={styles.buttonStyle}
        color={Colors.tertiary}
        onPress={handleSubmit(onSubmit)}
      >
        Save Changes
      </Button>
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
  buttonStyle: {
    bottom: 0,
    position: "absolute",
    width: "95%",
    paddingVertical: 10,
    margin: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 15,
  },

  input: {
    color: "black",
    fontSize: 18,
    borderBottomWidth: 1,
    backgroundColor: Colors.bkg,
  },
});

export default EditProfileScreen;
