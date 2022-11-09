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
            <View style={styles.container}>
               {
                this.state.showCamera? 
                <MyCamera
               
                    onImageUpload = {url => this.onImageUpload(url)}
                />:
                <View  style={styles.container}>
                    <Text style={styles.tittle}>Nuevo Posteo</Text>
                    <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Descripción"
                    onChangeText={text=>this.setState({
                        descripcion:text
                    })}
                    />
                    <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.guardarPost()}>
                        <Text style={styles.buttonText}>Guardar Posteo</Text>
                    </TouchableOpacity>
                </View>
               }
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop:10,
        height:"100%"
    },
    tittle:{
        marginBottom:20
    },
    field:{
        borderColor:"#dcdcdc",
        borderWidth:1,
        borderRadius:2,
        padding:3,
        marginBottom:8
    },
    button:{
        borderRadius:2,
        padding:3,
        backgroundColor:"green"
    },
    buttonText:{
        color:"grey"
    }
})