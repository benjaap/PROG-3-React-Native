import React, {Component} from "react";
import Home from "../screens/Home"
import MiPerfil from "../screens/MiPerfil"

import NewPost from "../screens/NewPost"
import Busqueda from "../screens/Busqueda"
import { BottomTabBarHeightCallbackContext, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {StyleSheet , Text , View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Comments from "../screens/Comments"

const Tab = createBottomTabNavigator()


export default class  Menu extends Component{
    render(){
        return (
            
            <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor:"#00c2cb",
                backgroundColor: "#00c2cb",
                headerBackgroundContainerStyle:{color:"#00c2cb"},
                headerLeftLabelVisible:false
            }}
            >
                <Tab.Screen 
                    name="Home" 
                    component={Home}
                    options={ {tabBarIcon:({color, size})=>(<FontAwesome name="home" color={color} size={28} />),
                    headerShown:false,
                    
                }}/>
                <Tab.Screen
                     name="NewPost" 
                     component={NewPost} 
                     options={{tabBarIcon:({color, size})=>(<MaterialIcons name="add-box" color={color} size={28}  />),
                     headerShown:false,
                }}/>
                <Tab.Screen 
                    name="MiPerfil" 
                    component={MiPerfil}
                    options={{tabBarIcon:({color, size})=> (<Ionicons name="person"  color={color} size={28} />),
                    headerShown:false,
               }}/>
                <Tab.Screen 
                    name = "Busqueda"
                    component ={Busqueda} 
                    options ={{tabBarIcon:({color, size})=>(<FontAwesome name="search"color={color}  size={28} />),
                    headerShown:false,
                }}/>
            </Tab.Navigator>
               
        )
    }
    
    
}
const style= StyleSheet.create({
    tab:{
        color:"red"
            }
        
        
   
})