import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Menu from "./src/components/Menu";
import Comentarios from "./src/screens/Comments"
import PerfilBusqueda from './src/screens/PerfilBusqueda';
import LogOut from "./src/screens/LogOut"
;
const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
  

      <NavigationContainer >
      
      <Stack.Navigator >
      
        <Stack.Screen name='Register' component={ Register }   options={ { headerShown: false } }  />
        <Stack.Screen name='Login' component={ Login }  options={ { headerShown: false } }   />
        <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/>
        <Stack.Screen name='Comentarios' component={Comentarios}/>
        <Stack.Screen name = "PerfilBusqueda" component={PerfilBusqueda}/>
        <Stack.Screen name='LogOut' component={ LogOut }     />

      </Stack.Navigator>
      
    </NavigationContainer>
  
    );
}

