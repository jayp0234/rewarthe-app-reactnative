// @ts-nocheck
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Signup,
  Welcome,
  Home,
  TC,
  BarcodeScreen,
  ProfileScreen,
  History,
} from "./screens";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import useAuth from "./hooks/useAuth";

import { LogBox } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "./constants/comman";

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBEvVJsxrOlMioXeOrmSw5NkUxzM2CchrA",
  authDomain: "capstonerewarthe.firebaseapp.com",
  projectId: "capstonerewarthe",
  storageBucket: "capstonerewarthe.appspot.com",
  messagingSenderId: "17188323678",
  appId: "1:17188323678:web:74dc7034b2b417cf6acfcf",
  measurementId: "G-H6HF8MT645",
};
LogBox.ignoreAllLogs();

export const AuthContext = createContext(null);
export default function App() {
  const { user } = useAuth();
  const authContext = useContext(AuthContext);
  const [isLoginId, setIsloginId] = useState();
  console.log("user---", user);
  const handleLoginData = async () => {
    const retrievedValue = await getData("loginId");
    setIsloginId(retrievedValue);
    console.log(retrievedValue);
  };
  useEffect(() => {
    handleLoginData();
  }, []);

  const myId = async () => await getData("loginId");
  if (isLoginId) {
    return (
      <AuthContext.Provider value={myId()}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BarcodeScreen"
              component={BarcodeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TC"
            component={TC}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
