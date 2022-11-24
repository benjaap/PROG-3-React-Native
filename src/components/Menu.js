import React, {Component} from "react";
import Home from "../screens/Home"
import MiPerfil from "../screens/MiPerfil"

import NewPost from "../screens/NewPost"
import Busqueda from "../screens/Busqueda"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Stylesheet , Text , View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Comments from "../screens/Comments"

const Tab = createBottomTabNavigator()


export default class  Menu extends Component{
    render(){
        return (
            
            <Tab.Navigator screenOptions={{ tabBarStyle:{backgroundColor:"#218EAB", borderColor: "#080f28", borderTopWidth:5} }}>
                <Tab.Screen name="Home" component={Home}options={ {tabBarIcon:()=><FontAwesome name="home" size={24} color="black" />, headerStyle:{ backgroundColor:"#218EAB", borderColor: "#080f28", borderBottomWidth:5}}}/>
                <Tab.Screen name="NewPost" component={NewPost} options={{tabBarIcon:()=><MaterialIcons name="add-box" size={24} color="black" />,headerStyle:{ backgroundColor:"#218EAB", borderColor: "#080f28", borderBottomWidth:5}}}/>
                <Tab.Screen name="MiPerfil" component={MiPerfil} options={{tabBarIcon:()=><Ionicons name="person" size={24} color="black" />,headerStyle:{ backgroundColor:"#218EAB", borderColor: "#080f28", borderBottomWidth:5}}}/>
                <Tab.Screen name = "Busqueda" component ={Busqueda} options ={{tabBarIcon:()=><FontAwesome name="search" size={24} color="black" />,headerStyle:{ backgroundColor:"#218EAB", borderColor: "#080f28", borderBottomWidth:5}}}/>
            </Tab.Navigator>
               
        )
    }
    
}