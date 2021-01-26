import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "../../../../components/General/Header";
import Colors from "../../../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import fonts from "../../../../constants/fonts";
import * as paymentActions from "../../../../store/actions/Payments";

const PaymentMethodsScreen = ({ navigation, route }) => {
  const { headerTitle } = route.params;
  const cards = useSelector((state) => state.Payments.cardDetails);
  const [cardId, setCardId] = useState("");
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (cardId.length > 0) {
      refRBSheet.current.open();
    }
  }, [cardId]);

  const renderCardComponents = () => {
    return cards.map((details) => {
      return (
        <View style={styles.itemContainer} key={details._id}>
          <View>
            {details.number[0] !== "4" ? (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../../../../assets/mastercard.png")}
              />
            ) : (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../../../../assets/visa.png")}
              />
            )}
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 18 }}>{details.nickname}</Text>
            <Text style={{ fontSize: 14, color: "black" }}>
              {details.number}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={{ zIndex: 1 }}
              onPress={() => {
                setCardId(details._id);
              }}
            >
              <EvilIcons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 10 }}>|</Text>
            <TouchableOpacity
              style={{ zIndex: 1 }}
              onPress={() => {
                Alert.alert("Are you sure you want to delete this card?", "", [
                  {
                    text: "Yes",
                    onPress: async () => {
                      setIsLoading(true);
                      await dispatch(
                        paymentActions.deleteCard(details._id, token)
                      );
                      setIsLoading(false);
                    },
                  },
                  { text: "No" },
                ]);
              }}
            >
              <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
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
      <Header text={headerTitle} />
      <View style={{ margin: 10 }}>
        <Text style={styles.title}>Online Payments</Text>
        <Text style={{ fontSize: 12 }}>
          After your first payment, we will save your details for future use.
        </Text>
        {renderCardComponents()}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddCard");
          }}
          style={styles.itemContainer}
        >
          <Entypo name="credit-card" size={30} color="black" />
          <Text style={{ fontSize: 18, marginLeft: 20 }}>
            Credit,Debit & ATM Cards
          </Text>
          <Entypo
            name="chevron-right"
            size={24}
            color="#888"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <View style={styles.itemContainer}>
          <Image
            style={{ height: 40, width: 40 }}
            source={{
              uri:
                "https://cdn0.iconfinder.com/data/icons/payment-vol-3/100/NETBanking_credit_debit_card_bank_transaction-512.png",
            }}
          />
          <Text style={{ fontSize: 18, marginLeft: 20 }}>Net Banking</Text>
          <Entypo
            name="chevron-right"
            size={24}
            color="#888"
            style={styles.iconStyle}
          />
        </View>

        <Text style={styles.title}>UPI</Text>
        <View style={styles.itemContainer}>
          <Entypo
            name="chevron-right"
            size={24}
            color="#888"
            style={styles.iconStyle}
          />
          <Image
            style={{ height: 40, width: 40 }}
            source={{
              uri:
                "https://icon-icons.com/icons2/729/PNG/48/paytm_icon-icons.com_62731.png",
            }}
          />
          <Text style={{ fontSize: 18, marginLeft: 20 }}>Paytm UPI</Text>
        </View>
        <View style={styles.itemContainer}>
          <Entypo
            name="chevron-right"
            size={24}
            color="#888"
            style={styles.iconStyle}
          />
          <Image
            style={{ height: 40, width: 40 }}
            source={{
              uri:
                "https://icon-icons.com/icons2/2389/PNG/48/google_pay_logo_icon_145230.png",
            }}
          />
          <Text style={{ fontSize: 18, marginLeft: 20 }}>Google Pay</Text>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={250}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.8)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 18, fontFamily: fonts.Bold }}>
            Rename card
          </Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            mode="flat"
            label="Nickname for the card"
            style={styles.input}
            keyboardType="default"
            autoCompleteType="name"
            theme={{ colors: { primary: Colors.primary } }}
          />
          <Button
            mode="contained"
            color={Colors.primary}
            style={{ marginTop: 20 }}
            onPress={async () => {
              setIsLoading(true);
              await dispatch(
                paymentActions.editCardNickName(cardId, nickname, token)
              );
              setIsLoading(false);
            }}
            contentStyle={{ padding: 7 }}
          >
            Save
          </Button>
        </View>
      </RBSheet>
    </View>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 25,
  },
  title: { fontSize: 20 },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  iconStyle: {
    position: "absolute",
    right: 0,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: { backgroundColor: "transparent" },
});
