import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const PlainCard = ({ title, subtitle, navScreen }) => {
  const navigation = useNavigation();
  return (
    <Card style={styles.container}>
      <TouchableOpacity
        // onPress={() => navigation.navigate(navScreen)}
        style={{ height: "100%", justifyContent: "center" }}
      >
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{subtitle}</Paragraph>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 100,
    margin: 10,
  },
});
export default PlainCard;
