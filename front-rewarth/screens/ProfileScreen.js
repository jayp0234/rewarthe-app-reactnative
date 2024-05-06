import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import profilePic from "../assets/images/profile.png";

const ProfileScreen = ({navigation}) => {
  return (
    <>
      <LinearGradient
        style={{ height: 310 }}
        colors={["#C84B31", "#2D4263", "#191919"]}
        end={{ x: 0.1, y: 0.8 }}
      >
        <View style={styles.profileHeader}>
          <Image source={profilePic} style={styles.profilePic} />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.bio}>Lover of coffee, music, and coding.</Text>
        </View>
      </LinearGradient>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Contact Information</Text>
        <Text style={styles.infoContent}>Email: johndoe@example.com</Text>
        <Text style={styles.infoContent}>Phone: (123) 456-7890</Text>
      </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={()=>{
         navigation.navigate("Login");
        }}>
          <Text style={styles.settingsText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    top: "30%",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EEEEEE",
  },
  bio: {
    fontSize: 15,
    color: "#FF407D",
    marginTop: 5,
    fontWeight: "500",
  },
  infoSection: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  settingsSection: {
    padding: 20,
  },
  settingsButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
  },
  settingsText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
