import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './context/AppContext';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import SavedServicesScreen from './screens/SavedServicesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Services" component={ServicesScreen} />
          <Stack.Screen name="SavedServices" component={SavedServicesScreen} options={{ title: 'Saved Services' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}