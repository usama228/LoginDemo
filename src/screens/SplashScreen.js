import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const SplashScreenComponent = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after 2000ms (adjust as needed)
      SplashScreen.hide();
      navigateToLogin();
    }, 2000); // Simulating a delay

    return () => clearTimeout(timeout);
  }, []);

  const navigateToLogin = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Legion</Text>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#6200EE" // Adjust color to match your design
          style={styles.activityIndicator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#6200EE',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  activityIndicator: {
    marginTop: 20, // Adjust spacing as needed
  },
});

export default SplashScreenComponent;


