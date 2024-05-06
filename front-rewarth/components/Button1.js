import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../constants/colors";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const Button1 = (props) => {
  const filledBgColor = props.color || COLOURS.white;
  const outlinedColor = COLOURS.secondary;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLOURS.white : COLOURS.white;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 18, fontWeight: "800", ...{ color: textColor } }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    
    paddingVertical: 20,
    borderColor: COLOURS.white,
    borderWidth: 2,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 1,
      height: 2,
      color: "black",
    },
    elevation: 8,
    
    
  },
});

export default Button1;
