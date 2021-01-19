import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as ImageManipulator from "expo-image-manipulator";
import * as profileActions from "../../store/actions/Profile";
import { Portal, Dialog, Button, Avatar } from "react-native-paper";
import fonts from "../../constants/fonts";
const DP = ({ username, image, setImage, canEdit, setIsLoading }) => {
  const token = useSelector((state) => state.Profile.token);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const clickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.7,
    });

    if (!result.cancelled) {
      onSave(result);
      setImage(result.uri);
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        onSave(result);
        setImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const onSave = async (image) => {
    setIsLoading(true);
    const manipResult = await ImageManipulator.manipulateAsync(image.uri, [
      { resize: { width: 720, height: 540 } },
    ]);
    const body = new FormData();
    body.append("image", {
      uri: manipResult.uri,
      type: "image/jpg",
      name: "profilePic.jpg",
    });
    try {
      await dispatch(profileActions.changeImage(body, token));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return Alert.alert("Something went wrong", "Please try again", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={styles.infoContainer}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <Button
              onPress={() => clickImage()}
              style={{ width: "100%" }}
              color={Colors.extra2}
            >
              Take a picture!
            </Button>
            <Button
              onPress={() => pickImage()}
              style={{ width: "100%" }}
              color={Colors.extra2}
            >
              Choose from gallery
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View>
        <Avatar.Image
          size={120}
          source={{
            uri: image,
          }}
          style={{ backgroundColor: "white" }}
        />
        {canEdit && (
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            style={styles.editContainer}
          >
            <AntDesign name="camera" size={24} color="black" style={{}} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.name}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 25,
    textTransform: "uppercase",
    fontFamily: fonts.Bold,
    marginTop: 10,
    textAlign: "center",
  },
  editContainer: {
    position: "relative",
    left: 80,
    bottom: 25,
    width: 30,
  },
});

export default DP;
