// @ts-nocheck
import React, { useContext } from "react";
import { View, StyleSheet, Text, Clipboard, Linking } from "react-native";
import COLOURS from "../constants/colors";
import Navbar from "../components/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/images/front3.png";
import Barcode from "react-native-barcode-svg";
import { AuthContext } from "../App";
import { useGetPoints } from "../hooks/useGetPoints";
import { BASEURL } from "../constants/comman";

const BarcodeScreen = () => {
  const { _j } = useContext(AuthContext);
  const barcode = useGetPoints();
  const barcodeVal = BASEURL + "/api/reward-claim/?userId=" + _j;
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#C84B31", "#2D4263", "#191919"]}
        end={{ x: 0.1, y: 0.8 }}
      >
        <View style={styles.welcomeBar}>
          <Text style={styles.text1}>RewArthe</Text>
          <Text style={styles.text2}>Scan the Code</Text>
        </View>

        <View style={styles.barcodeContainer}>
          <View style={{}}>
            <Text style={styles.cName}>Customer</Text>
          </View>
          {barcode?.points > 0 ? (
            <View style={styles.barcodeView}>
              <Barcode
                value={barcodeVal}
                format="CODE128"
                style={styles.barcode}
                maxWidth={200}
              />
              <Text onPress={() => Linking.openURL(barcodeVal)}>
                Click to to claim!!
              </Text>
            </View>
          ) : (
            <View style={styles.barcodeView}>
              <Text onPress={() => Clipboard.setString(barcodeVal)}>
                Buy more , Get More reward !!
              </Text>
            </View>
          )}
          <View style={styles.line} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                top: "45%",
                // left: "40%",
                fontWeight: "600",
                color: "#0C2D57",
              }}
            >
              Your points
            </Text>
            <Text
              style={{
                fontSize: 22,
                top: "45%",
                // left: "500%",
                fontWeight: "900",
                color: "#0C2D57",
              }}
            >
              {barcode?.points}
            </Text>
          </View>
        </View>

        <Navbar />
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeBar: {
    top: "7%",
    alignItems: "center",
  },

  text1: {
    color: COLOURS.light,
    fontSize: 25,
    fontWeight: "500",
    opacity: 0.7,
  },
  text2: {
    color: COLOURS.light,
    fontSize: 30,
    fontWeight: "600",
    top: "5%",
  },
  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 50,
    left: "80%",
    right: "auto",
    top: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  barcodeContainer: {
    backgroundColor: "#FEFBF6",
    width: "90%",
    height: 400,
    top: "22%",
    left: "5%",
    right: "auto",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "white", // Directly using white color
    shadowOpacity: 0.5, // You might need to adjust the opacity for visibility
    shadowRadius: 8, // Can be adjusted for the blur effect
  },
  points: {
    fontSize: 50,
    fontWeight: "900",
    color: "#0C2D57",
    top: 20,
    left: 30,
    right: "auto",
  },
  points1: {
    fontSize: 25,
    fontWeight: "800",
    color: "#0C2D57",
    top: 40,
    left: 125,
  },
  logo: {
    width: 70,
    height: 70,
    margin: 20,
    borderRadius: 10,
  },
  cName: {
    color: COLOURS.black,
    fontSize: 25,
    fontWeight: "700",
    top: "50%",
    textAlign: "center",
  },
  barcodeView: {
    alignItems: "center",
    top: "20%",
  },
  barcode: {},
  barcodeText: {
    top: 5,
    fontSize: 18,
  },
  line: {
    height: 6,
    backgroundColor: "#e35b1b",
    marginHorizontal: 0,
    opacity: 0.8,
    top: "35%",
  },
});

export default BarcodeScreen;
