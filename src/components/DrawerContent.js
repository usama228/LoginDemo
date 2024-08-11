// DrawerContent.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const DrawerContent = ({ navigation }) => {
  const handleLogout = () => {
    // Perform logout logic (clear user session, navigate to login screen, etc.)
    navigation.navigate('Login'); // Navigate to Login screen after logout
  };

  return (
    <DrawerContentScrollView>
      <View>
        <DrawerItem
          label="Dashboard"
          onPress={() => navigation.navigate('DashboardTabs')}
        />
        <DrawerItem
          label="Logout"
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

