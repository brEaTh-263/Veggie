import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../../components/General/Header";
import Colors from "../../../constants/Colors";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import * as profileActions from "../../../store/actions/Profile";
import { useDispatch } from "react-redux";

const PaymentMethodsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Header text="Select Payment Method" />
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 20 }}>Online Payments</Text>
        <Text style={{ fontSize: 12 }}>
          After your first payment, we will save your details for future use.
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Entypo name="credit-card" size={40} color="black" />
          <Text style={{ fontSize: 18, marginLeft: 20 }}>
            Credit,Debit & ATM Cards
          </Text>
          <Entypo
            name="chevron-right"
            size={24}
            color="#888"
            style={{
              position: "absolute",
              right: 0,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
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
            style={{
              position: "absolute",
              right: 0,
            }}
          />
        </View>

        <Text style={{ fontSize: 20 }}>UPI</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Entypo
            name="chevron-right"
            size={24}
            color="#888"
            style={{
              position: "absolute",
              right: 0,
            }}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Entypo
            name="chevron-right"
            size={24}
            color="#888"
            style={{
              position: "absolute",
              right: 0,
            }}
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
        <Text style={{ fontSize: 20 }}>Other Options</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(profileActions.getPaymentMethod("Cash on Delivery"));
            navigation.navigate("CheckOut");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <MaterialCommunityIcons name="cash" size={40} color="black" />
          <Text style={{ fontSize: 18, marginLeft: 20 }}>Cash on Delivery</Text>
          <Entypo
            name="chevron-right"
            size={24}
            color="#888"
            style={{
              position: "absolute",
              right: 0,
            }}
          />
        </TouchableOpacity>
      </View>
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
});
