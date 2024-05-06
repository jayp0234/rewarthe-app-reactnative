import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.paragraph}>
        Welcome to our app. If you continue to browse and use this app, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern RewArthe's relationship with you in relation to this app.
      </Text>
      {/* Add more paragraphs as needed */}
      <Text style={styles.paragraph}>
        The term 'RewArthe' or 'us' or 'we' refers to the owner of the app whose registered office is Calgary. The term 'you' refers to the user or viewer of our app.
      </Text>
      {/* Add terms and conditions content */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    top:50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TC;
