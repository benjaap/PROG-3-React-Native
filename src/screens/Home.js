import React, {Component} from "react";
import { render } from "react-dom";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from "react-native-web";

export default class Home extends Component{
    render(){
        return(
            <View>
                <Text>Soy el Home</Text>
            </View>
        )
    }
}

