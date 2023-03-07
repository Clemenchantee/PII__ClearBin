import React from "react";
import { StyleSheet, TextInput, Image, View } from "react-native";
import styles from "../theme/styles";

const Input = ({ icon, placeholder, value, onChangeText, secureTextEntry }) => {
    return (
      <View style={styles.inputContainer}>
        <Image source={icon} style={styles.inputIcon} />
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  };

  export default Input;