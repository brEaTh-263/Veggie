import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../../components/General/Header";
import Colors from "../../../constants/Colors";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import * as paymentActions from "../../../store/actions/Payments";
import { useDispatch, useSelector } from "react-redux";

const PaymentMethodsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { headerTitle } = route.params;
  const cards = useSelector((state) => state.Payments.cardDetails);

  const renderCardComponents = () => {
    return cards.map((details) => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
          key={details._id}
        >
          <View>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../../../assets/visa.png")}
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 18 }}>{details.nickname}</Text>
            <Text style={{ fontSize: 14, color: "black" }}>
              {details.number}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
            }}
            onPress={() => {}}
          >
            <Entypo name="dots-three-vertical" size={22} color="#888" />
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Header text={headerTitle} />
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 20 }}>Online Payments</Text>
        <Text style={{ fontSize: 12 }}>
          After your first payment, we will save your details for future use.
        </Text>
        {renderCardComponents()}
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("AddCard");
          }}
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
        </TouchableOpacity>
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
            dispatch(paymentActions.getPaymentMethod("Cash on Delivery"));
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
