// @ts-nocheck
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import COLOURS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
// @ts-ignore
import profilePic from "../assets/images/profile.png";
import Navbar from "../components/Navbar";

import { BASEURL } from "../constants/comman";
import { useProducts } from "../hooks/useProducts";
import { useGetPoints } from "../hooks/useGetPoints";

import { AuthContext } from "../App";

// @ts-ignore
const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const { _j } = useContext(AuthContext);
  const mypoint = useGetPoints();
  const myproducts = useProducts(_j);

  const BuyNowPress = async (obj) => {
    try {
      setLoading(true);
      console.log("obj", obj);
      let objData = {
        userId: _j,
        productId: obj?.id,
        price: obj?.price,
        image: obj?.image,
        name: obj?.name,
      };

      const response = await fetch(`${BASEURL}/api/buy-product`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(objData), // body data type must match "Content-Type" header
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("BuyNowPress Data:---->", data);
      if (data.msg == "Product buy successfully") {
        alert(data?.msg);
      } else {
        alert(data?.msg);
      }
      // setPointData(data)
      setLoading(false);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  // Render item function for the FlatList
  const renderItem = ({ item }) => (
    <View style={[styles.card, styles.cardOne]}>
      <View
        style={{
          width: "100%",
        }}
      >
        <Image source={{ uri: item?.image }} style={styles.cardImage} />
      </View>

      <View style={styles.lineStyle} />
      <Text style={styles.cardTitle}>
        {item?.points ? Number(item?.points) : "0"} points
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={styles.cardText}>${item?.price} spent</Text>
        <TouchableOpacity
          onPress={() => BuyNowPress(item)}
          style={{
            padding: 8,
            backgroundColor: "orange",
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Buy now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#C84B31", "#2D4263", "#191919"]}
        end={{ x: 0.1, y: 0.8 }}
      >
        <View style={styles.welcomeBar}>
          <Text style={styles.text1}>Hello</Text>
          <Text style={styles.text2}>Customer</Text>
        </View>

        <Image source={profilePic} style={styles.profilePic} />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <View style={styles.pointsContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.points}>
                {
                  // @ts-ignore
                  mypoint?.points
                }
              </Text>
              <Text style={styles.points1}>points</Text>
            </View>
          </View>
        </View>

        <View style={{ top: 75 }}>
          <Text style={styles.headingText}>Best Deals</Text>

          <View style={styles.scrollContainer}>
            {loading ? (
              <ActivityIndicator
                style={{ marginVertical: 20 }}
                size="large"
                color="#0000ff"
              />
            ) : (
              <>
                {/* // @ts-ignore */}
                {myproducts?._j?.length > 0 ? (
                  <FlatList
                    // @ts-ignore
                    data={myproducts?._j}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 40,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                      }}
                    >
                      No data found
                    </Text>
                  </View>
                )}
              </>
            )}
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
    top: "8%",
    paddingLeft: "6%",
  },
  text1: {
    color: COLOURS.light,
    fontSize: 25,
    opacity: 0.7,
  },
  text2: {
    color: COLOURS.light,
    fontSize: 30,
    fontWeight: "600",
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
  pointsContainer: {
    backgroundColor: "#FEFBF6",
    width: "90%",
    height: 70,
    // top: "5%",
    // left: "5%",
    // right: "auto",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "white", // Directly using white color
    shadowOpacity: 0.5, // You might need to adjust the opacity for visibility
    shadowRadius: 5, // Can be adjusted for the blur effect
    zIndex: 10,
    padding: 15,
  },
  points: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0C2D57",
    // top: 20,
    // left: 30,
    // right: "auto",
  },
  points1: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0C2D57",
    // top: 30,
    // left: 125,
  },
  carousel: {
    top: "8%",
  },
  headingText: {
    color: COLOURS.light,
    fontSize: 25,
    fontWeight: "600",
    paddingLeft: 25,
  },
  line: {
    height: 6,
    backgroundColor: "#000000",
  },
  card: {
    width: 300,
    height: 200,
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 16,
    margin: 8,
    // borderWidth: 2,
    padding: 15,
    paddingBottom: 20,
  },
  cardOne: {
    backgroundColor: "#FBF6EE",
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "white",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 16,
  },
  scrollContainer: {
    paddingHorizontal: 30,
  },
  cardImage: {
    width: "100%", // Set your desired width
    height: "70%", // Set your desired height
    // aspectRatio: 1,
    // bottom: "1%",
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#124076",
    // right: "25%",
    // bottom: "4%",
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
    bottom: "8%",
  },
});

export default Home;
