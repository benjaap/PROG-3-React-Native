import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Menu from "./src/components/Menu"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={ Register }     />
        <Stack.Screen name='Login' component={ Login }     />
        <Stack.Screen name='Menu' component={Menu}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

