import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button1 from "../components/Button1";

const Welcome = ({ navigation }) => {
  return (
    <View style={{flex:1}}>
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary, COLORS.dark]}
    >
      <View style={{ flex: 1, }}>
        <View>
          
          <View
            style={{
              elevation: 8, // Android elevation
              // iOS shadow properties
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              position: "absolute",
              top: 20,
              left: '15%',
              // transform: [
              //   { translateX: 50 },
              //   { translateY: 60 },
              //   { rotate: "0deg" },
              // ],
            }}
          >
            <Image
              source={require("../assets/images/front3.png")}
              style={{
                width: 300,
                height: 300,
                borderRadius: 20,
              }}
            />
          </View>
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 400,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Started
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4,
              }}
            >
              One Stop Solution for
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Shopping Rewards and Online Receipts
            </Text>
          </View>

          <Button1
            title="Join Now"
            onPress={() => navigation.navigate("Signup")}
            style={{
              marginTop: 22,
              width: "100%",
              elevation: 7,
              shadowColor: COLORS.black,
              shadowOffset: {
                width: 1,
                height: 2,
              }
            }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Already have an account ?
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: "bold",
                  marginLeft: 4,
                  elevation: 8,
                  shadowColor: COLORS.black,
                  shadowOffset: {
                    width: 1,
                    height: 2,
                  },
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
    </View>
  );
};

export default Welcome;
