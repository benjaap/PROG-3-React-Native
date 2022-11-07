import React, {Component} from "react";
import { Camera } from "expo-camera";
import{View, Text,TextInput, TouchableOpacity, StyleSheet,Image} from "react-native"
import MyCamera from "../components/MyCamera";
import {auth, db} from "../firebase/config"

export default class NewPost extends Component {
constructor(props){
    super(props)
    this.state={
        descripcion: "",
        likes: [],
        comments:[],
        showCamera:true,
        url:""
    }
}
guardarPost(){
    console.log("guardar post")
    db.collection("posts").add({
        createdAt:Date.now(),
        owner:auth.currentUser.email,
        descripcion: this.state.descripcion,
        likes: [],
        comments:[],
        url:this.state.url
    })
    .then((res)=>{
        console.log("Posteo exitoso")
        this.setState({
            descripcion:""
        }, this.props.navigation.navigate("Home")
        )
    })
    .catch(err => console.log(err))
}  
onImageUpload(url){
    this.setState({
        url,
        showCamera:false
    })
}
    render(){
        return (
            <View >
               {
                this.state.showCamera? 
                <MyCamera
                    onImageUpload = {url => this.onImageUpload(url)}
                />:
                <View>
                    <Text>Nuevo Posteo</Text>
                    <TextInput
                    style={{}}
                    keyboardType="default"
                    placeholder="Descripción"
                    onChangeText={text=>this.setState({
                        descripcion:text
                    })}
                    />
                    <TouchableOpacity
                    style={{}}
                    onPress={()=>this.guardarPost()}>
                        <Text>Guardar Posteo</Text>
                    </TouchableOpacity>
                </View>
               }
            </View>
        )
    }
}
StyleSheet.create({

})