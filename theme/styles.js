import { StyleSheet } from "react-native";

// Common styles
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
  logo:{height: 50, width: 300, alignItems: 'center'}, 
  police :{ fontWeight: 'bold', fontSize : 15},
  homeContainer : {flex: 1, alignItems: "center", justifyContent: 'center', marginBottom : 50},
  boutonRenseignement: {backgroundColor: "#469F9A"},
});

// Common stack header options
export const screenOptions = {
  headerStyle: {
    backgroundColor: "#469F9A",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  logoCarre : {height: 50, width: 50}
};

export default styles;
