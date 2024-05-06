import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Data saved successfully!");
  } catch (e) {
    console.error("Failed to save data:", e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Retrieved data:------>", value);
      return value;
    } else {
      console.log("No data found for the key:", key);
      return null;
    }
  } catch (e) {
    console.error("Failed to retrieve data:", e);
    return null;
  }
};
export function formatAsIndianCurrency(number) {
  if (typeof number !== "number" || isNaN(number)) {
    return "Invalid input";
  }
  console.log("number--", number);
  const formattedNumber = number.toLocaleString("en-IN", {});
  return formattedNumber;
}

//  export const BASEURL='https://41e0-122-170-63-165.ngrok-free.app'
export const BASEURL = "http://192.168.1.3:8000";

const axiosInstance = axios.create({
  baseURL: BASEURL, // Replace with your base URL
  headers: {
    "X-Custom-Token": "your_jwt_token", // Replace with your actual JWT token
  },
});

export default axiosInstance;
