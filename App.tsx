
// App.js

import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'; // Adjust path as necessary
import { name as appName } from './app.json';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;


