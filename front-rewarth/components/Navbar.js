import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons"; // Make sure to install this package
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.tabBar}>
      <Tab
        icon="home"
        text="Home"
        onPress={() => navigation.navigate("Home")}
      />
      <Tab
        icon="barcode-reader"
        text="Barcode"
        onPress={() => navigation.navigate("BarcodeScreen")}
      />
        <Tab
        icon="paid"
        text="History"
        onPress={() => navigation.navigate("History")}
      />
      <Tab
        icon="person"
        text="Profile"
        onPress={() => navigation.navigate("ProfileScreen")}
      />
     
    </View>
  );
};

const Tab = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.tab} onPress={onPress}>
    <MaterialIcon name={icon} size={35} color="#2B2A4C" style={styles.icons} />
    <Text style={styles.iconText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#F8F8F8",
    borderWidth: 2,
    borderColor: "#000000",
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "white", // Directly using white color
    shadowOpacity: 0.5, // You might need to adjust the opacity for visibility
    shadowRadius: 8, // Can be adjusted for the blur effect
  },
  tab: {
    alignItems: "center",
  },
  iconText: {
    color: "#000000",
    fontSize: 12,
  },
});

export default Navbar;
