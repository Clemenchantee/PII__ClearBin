import { StyleSheet } from "react-native";

// Common styles
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: 'center' },
  text: { fontSize: 18, paddingBottom: 10 },
  logo:{height: 50, width: 300, alignItems: 'center'}, 
  police :{ fontWeight: 'bold', fontSize : 15},
  homeContainer : {flex: 1, alignItems: "center", justifyContent: 'center'},
  boutonRenseignement: {backgroundColor: "#469F9A"}, //marche pas
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "white",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
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
