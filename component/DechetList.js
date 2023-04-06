import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const DechetList = ({ waste, navigation }) => {
  if (waste.length > 0)
    return (
      <FlatList
        style={styles.wasteList}
        data={wastes}
        keyExtractor={(waste) => waste.id.toString()}
        renderItem={({ item }) => {
          return <wasteItem waste={item} navigation={navigation} />;
        }}
      />
    );
  else
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Pas de résultats pour ce déchets </Text>
      </View>
    );
};

export default DechetList;

const styles = StyleSheet.create({
  wasteList: {
    flex: 1,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
