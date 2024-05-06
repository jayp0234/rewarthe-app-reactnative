import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button2 from "../components/Button2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { storeData } from "../constants/comman";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/; // Simple regex for email validation
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError(""); // Clear error message
    return true;
  };

  // Password validation
  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    setPasswordError(""); // Clear error message
    return true;
  };

  const handleSubmit = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    // Only proceed if email and password are valid and T&C checkbox is checked
    if (isEmailValid && isPasswordValid) {
      try {
        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Access the user object from the user credential
        const user = userCredential.user;
        // Extract the UID from the user object
        const uid = user.uid;
  
        console.log('UID:', uid);
        await storeData('loginId',uid)
         navigation.navigate("Home");
      } catch (error) {
        alert('Please Incorrect username or password')
        console.log("got error: ", error.message);
        // Handle specific Firebase errors here (e.g., email already in use)
        // This can also be a good place to set a general error state variable to display Firebase related errors.
      }
    } else {
      setShowErrorMessage(true); // Optionally use this for terms and conditions or other general error messages
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.missedText}>You have been missed !</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainerOne}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={styles.eyeIcon}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <Button2
          title="Login"
          filled
          style={styles.loginButton}
          onPress={handleSubmit}
        />

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Login with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <SocialButton platform="Facebook" />
          <SocialButton platform="Google" />
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account ?</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.registerLinkText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getPlatformImage = (platform) => {
  switch (platform.toLowerCase()) {
    case "facebook":
      return require("../assets/images/facebook.png");
    case "google":
      return require("../assets/images/google.png");
    // Add more cases as needed
    default:
      return null; // Return null or handle the case when platform is not recognized
  }
};

const SocialButton = ({ platform }) => (
  <TouchableOpacity
    onPress={() => console.log("Pressed")}
    style={styles.socialButton}
  >
    <Image
      source={getPlatformImage(platform)}
      style={styles.socialIcon}
      resizeMode="contain"
    />
    <Text>{platform}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    marginHorizontal: 22,
    top: "4%",
  },
  welcomeContainer: {
    marginVertical: 35,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 12,
    color: COLORS.black,
    textAlign: "center",
    marginTop: 25,
  },
  missedText: {
    fontSize: 20,
    color: COLORS.dull,
    fontWeight: "500",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputContainerOne: {
    marginBottom: 12,
    marginTop: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 8,
    color: COLORS.black,
    marginTop: 10,
  },
  inputWrapper: {
    width: "100%",
    height: 55,
    borderColor: COLORS.black,
    borderWidth: 0,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    backgroundColor: COLORS.bg,
    elevation: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  input: {
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  checkbox: {
    marginRight: 8,
  },
  loginButton: {
    marginTop: 25,
    marginBottom: 4,
    elevation: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grey,
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 52,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: COLORS.bg,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  socialIcon: {
    height: 36,
    width: 36,
    marginRight: 8,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
  },
  registerText: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
  },
  registerLinkText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "900",
    marginLeft: 6,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14, // Adjust size as needed
    padding: 4, // Ensure there's some spacing
  },
});

export default Login;
