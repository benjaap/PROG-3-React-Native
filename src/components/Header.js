import React from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
export default function Header(){
    return(
        <Image styles={styles.header}
        source={require("../../assets/header.jpg")}
        resizeMode="contain"/>
        )
       
}
const styles= StyleSheet.create({
    header:{
        height:200
    }
})