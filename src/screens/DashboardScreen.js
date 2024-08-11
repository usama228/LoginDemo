import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DashboardScreen = ({ route, navigation }) => {
  const { userEmail } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userEmail}!</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default DashboardScreen;
