import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Regiter from './screens/Register';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='register' component={ Regiter }     />
        <Stack.Screen name='login' component={ Login }     />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

