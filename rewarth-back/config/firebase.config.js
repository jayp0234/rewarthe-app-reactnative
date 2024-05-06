const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyCUynoLzEGheDxKKYJfmI13Jn63sRW16KU",
  authDomain: "test-app-4a819.firebaseapp.com",
  projectId: "test-app-4a819",
  storageBucket: "test-app-4a819.appspot.com",
  messagingSenderId: "902338891129",
  appId: "1:902338891129:web:0c0dd05e7a2200fd90f3a8",
  databaseURL: "https://test-app-4a819-default-rtdb.firebaseio.com",
};

const init = initializeApp(firebaseConfig);
const rawartheDb = getDatabase(init);

module.exports = rawartheDb;
