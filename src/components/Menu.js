import React from "react"
import Home from "../screens/Home"
import Perfil from "../screens/Perfil"
import Posts from "../screens/Post"
import NewPost from "../screens/NewPost"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Stylesheet , Text , View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()


export default function Menu(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon:()=><FontAwesome name="home" size={24} color="black" />}}/>
            <Tab.Screen name="NewPost" component={NewPost} options={{tabBarIcon:()=><MaterialIcons name="add-box" size={24} color="black" />}}/>
            <Tab.Screen name="Perfil" component={Perfil} options={{tabBarIcon:()=><Ionicons name="person" size={24} color="black" />}}/>
            <Tab.Screen name="Posts" component={Posts} options={{tabBarIcon:()=><FontAwesome name="photo" size={24} color="black"/>}}/>
        </Tab.Navigator>
    )
}