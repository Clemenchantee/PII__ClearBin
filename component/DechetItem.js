import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

const DechetlItem = ({ waste }) => {
  return (
    <View>
        <Text styles={styles.text}>{waste.description}</Text>
        <Text styles={styles.text}>{waste.Poubelle}</Text>
    </View>
  );
};
export default DechetlItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
  },
  image: { height: 75, width: 75 },
});
