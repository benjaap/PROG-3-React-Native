import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, LogBox } from 'react-native';

export default class Post extends Component {

    constructor(props){
        super(props)
        this.state={
            descripcion:""
        }
    }

    crearPost(){
        db.collection("posts").add(
            {
                owner: auth.currentUser.email,
                descripcion: this.state.descripcion,
                createdAt:Date.now(),
                likes: [],
                comentarios:[]
            }
        ).then ((res)=> console.log(res))
        .catch((err)=>console.log(err))
    }
    
    render(){
       
        return(
             <View>
            
                <Text>Agregar posteo</Text>
                <TextInput
                    placeholder="descripción del posteo"
                    onChangeText={(text)=>{this.setState({descripcion:text})}}>
                 </TextInput>
                <TouchableOpacity onPress={()=>{this.crearPost()}}>
                    <Text>Crear posteo</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}
       
