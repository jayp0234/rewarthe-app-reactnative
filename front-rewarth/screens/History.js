// @ts-nocheck
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/Navbar";
import COLOURS from "../constants/colors";
import { style } from "twrnc";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { BASEURL, getData } from "../constants/comman";
import axios from "axios";
import { AuthContext } from "../App";
import { useTransactions } from "../hooks/useTransaction";
const History = ({ navigation }) => {
  const { _j } = useContext(AuthContext);

  const myTransaction = useTransactions(_j);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const renderItem = ({ item }) => (
    <View style={[styles.card, styles.cardOne]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item?.image }}
          style={{
            width: 80,
            height: 80,
          }}
        />
        <Text
          style={{
            color: "#000",
            fontWeight: "500",
            fontSize: 16,
            marginLeft: 20,
          }}
        >
          {item?.name}
        </Text>
      </View>

      <Text
        style={{
          color: "#000",
          fontWeight: "800",
          fontSize: 16,
        }}
      >
        ${item?.price}
      </Text>
    </View>
  );
  return (
    <>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            top: 40,
            left: 15,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcon
            name={"arrow-back"}
            size={35}
            color="#2B2A4C"
            style={styles.icons}
          />
        </TouchableOpacity>

        <View style={styles.expenceContainer}>
          <Text style={styles.exTitle}>Expense</Text>
          <Text style={styles.exText}>$ {myTransaction?.expense}</Text>
          <Text style={styles.exDec}>in {months[new Date().getMonth()]}</Text>
          {/* <Text style={styles.text1}>RewArthe</Text> */}
        </View>

        <LinearGradient
          style={{ flex: 1 }}
          colors={["#C84B31", "#2D4263", "#191919"]}
          end={{ x: 0.1, y: 0.8 }}
        >
          <View style={styles.welcomeBar}>
            <Text style={styles.text2}>Transaction History</Text>
          </View>
          <View style={styles.historyContainer}>
            <FlatList
              data={myTransaction?.transactions}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          {/* <Navbar/> */}
        </LinearGradient>
      </View>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  welcomeBar: {
    alignItems: "center",
  },

  text1: {
    color: COLOURS.black,
    fontSize: 30,
    fontWeight: "600",
    opacity: 1,
    top: "20%",
  },
  text2: {
    color: COLOURS.light,
    fontSize: 30,
    fontWeight: "600",
  },
  card: {
    width: "96%",
    flex: 1,
    borderRadius: 6,
    margin: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardOne: {
    backgroundColor: "#FBF6EE",
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "white",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  scrollContainer: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#124076",
    right: "25%",
    bottom: "4%",
  },
  cardText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000000",
    // right: "17%",
    // bottom: "2%",
  },
  lineStyle: {
    height: 1, // Set the thickness of the line
    backgroundColor: "black", // Set the color of the line
    width: "100%", // Make the line as wide as its container
    alignSelf: "center", // Center the line within its container, if necessary
    // bottom:"8%"
  },
  historyContainer: {
    width: "100%",
    padding: 5,
    height: 480,
  },
  expenceContainer: {
    marginVertical: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    // top:20
  },
  exTitle: {
    fontSize: 25,
    fontWeight: "600",
  },
  exText: {
    fontSize: 40,
    fontWeight: "800",
    top: "5%",
  },
  exDec: {
    fontSize: 20,
    fontWeight: "500",
    top: "5%",
  },
});
