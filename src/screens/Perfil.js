import React, { Component } from 'react'
import { auth } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class Perfil extends Component {

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'' 
        }
    }
    logOut (){
        auth.signOut(); 
        this.props.navigation.navigate("Register")
    }

    render(){
        return(
             <View>
                <Text>Mi perfil</Text>
                <TouchableOpacity onPress={()=> this.logOut()}>
                    <Text>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>)
       
    }
}