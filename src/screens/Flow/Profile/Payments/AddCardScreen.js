import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";
import fonts from "../../../../constants/fonts";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as paymentActions from "../../../../store/actions/Payments";
import { useDispatch, useSelector } from "react-redux";

const AddCardScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();
  const [cardNumber, setCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);
  const onSubmit = async (data) => {
    try {
      let formattedText = cardNumber.split(" ").join("");
      let type = "Visa";
      if (formattedText[0] !== "4") {
        type = "MasterCard";
      }

      setIsLoading(true);
      await dispatch(
        paymentActions.addCard(
          data.cardName,
          formattedText,
          data.expiryDate,
          data.nickname,
          type,
          token
        )
      );
      setIsLoading(false);
      navigation.navigate("PaymentMethods");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Something went wrong");
    }
  };
  useEffect(() => {
    errors.cardNumber
      ? showInvalidInputToast("Please provide a valid card name")
      : errors.cardName
      ? showInvalidInputToast("Please provide a valid card number")
      : errors.expiryDate
      ? showInvalidInputToast("Please give a valid expiry date")
      : errors.nickname
      ? showInvalidInputToast("Please give a nickname to the card")
      : null;
  }, [errors]);

  const handleCardNumber = (text) => {
    let formattedText = text.split(" ").join("");
    if (formattedText.length > 16) {
      return;
    }
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }

    setCardNumber(formattedText);
  };

  const showInvalidInputToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50
    );
  };

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
          Saving credentials...
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header text="Add card" />
        <Text style={styles.info}>
          We accept credit and debit cards from Visa, Mastercard and American
          Express.
        </Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                mode="flat"
                label="Name on Card"
                style={styles.input}
                keyboardType="name-phone-pad"
                autoCompleteType="name"
                theme={{ colors: { primary: Colors.primary } }}
              />
            )}
            name="cardName"
            rules={{ required: true, minLength: 3 }}
            defaultValue=""
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={{ position: "absolute", right: 10, top: "50%" }}>
            {cardNumber.length === 0 ? null : cardNumber[0] === "4" ? (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../../../../assets/visa.png")}
              />
            ) : (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../../../../assets/mastercard.png")}
              />
            )}
          </View>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={handleCardNumber}
            autoCompleteType="cc-number"
            keyboardType="number-pad"
            mode="flat"
            label="Card Number"
            style={styles.input}
            theme={{ colors: { primary: Colors.primary } }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                autoCompleteType="cc-exp"
                mode="flat"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                label="Expiry date(MM/YY)"
                style={styles.input}
                theme={{ colors: { primary: Colors.primary } }}
              />
            )}
            name="expiryDate"
            rules={{
              required: true,
              pattern: /(0[1-9]|1[0-2])[/][0-9]{2}/,
            }}
            defaultValue=""
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                mode="flat"
                label="Nickname for the card"
                style={styles.input}
                keyboardType="default"
                autoCompleteType="name"
                theme={{ colors: { primary: Colors.primary } }}
              />
            )}
            name="nickname"
            rules={{
              required: true,
            }}
            defaultValue=""
          />
        </View>
        <Text style={styles.info}>
          We will save this card for your convenience.If required, you can
          remove the card in the 'Payments' section in the 'Profile' menu. We do
          not store CVV.
        </Text>
        <Button
          style={{ margin: 15 }}
          contentStyle={{ padding: 7 }}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          color={Colors.primary}
        >
          Add Card
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddCardScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  input: { backgroundColor: "transparent" },
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
    height: "100%",
  },
  info: {
    color: "#888",
    fontWeight: "bold",
    margin: 15,
  },
});
