import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({ placeholder, onSubmit }) => {
  // Input value
  const [input, setInput] = useState("");

  return (
    <TextInput
      style={[styles.inputText, styles.inputContainer]}
      placeholder={placeholder}
      // Display input value
      value={input}
      onChangeText={(text) => {
        // Update input value
        setInput(text);
      }}
      onSubmitEditing={() => {
        if (!input) return; // Don't submit if empty

        // Call callback
        onSubmit(input);

        // Reset input value
        setInput("");
      }}
    ></TextInput>
  );
};

export default Input;


const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    borderRadius : 20,
    height: 100,
    padding: 10,
    marginBottom: 10,
  },
  inputText: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    textAlign: 'center'
  },
})