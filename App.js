import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Menu from "./src/components/Menu";
import Comentarios from "./src/screens/Comments"
import PerfilBusqueda from './src/screens/PerfilBusqueda';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={ Register }     />
        <Stack.Screen name='Login' component={ Login }     />
        <Stack.Screen name='Menu' component={Menu}/>
        <Stack.Screen name='Comentarios' component={Comentarios}/>
        <Stack.Screen name = "PerfilBusqueda" component={PerfilBusqueda}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

