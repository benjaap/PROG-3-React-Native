import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import{View, Text, TouchableOpacity, StyleSheet,Image} from "react-native"
import {storage} from "../firebase/config"
export default class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            uri: ""
        }
        this.metodosDeCamara = ''
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( ()=> this.setState({
            permission: true
        }))
        .catch ( error => console.log(error))

    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
            .then(photo=> this.setState({
                uri:photo.uri,
                showCamera:false
            }))
            .catch(error=>console.log(error))
    }

    guardarFoto(){
        fetch(this.state.uri)
            .then(res => res.blob())
                .then(image=> {
                    const ref= storage.ref(`photo/${Date.now()}.jpg`)
                    ref.put(image)
                        .then(()=>{
                            ref.getDownloadURL()
                                .then((uri)=>{
                                    this.props.onImageUpload(uri) //viene del componente padre (new post) 
                                })
                        })
                })
            .catch(error =>console.log(error))
    }

    clearFoto(){
        this.setState({
            uri:"",
            showCamera:true
        })
    }


  render() {
    return (
        <View>
            {
                this.state.permission ? 
                    this.state.showCamera ?
                        <View>
                            <Camera 
                                style={{}}
                                type={Camera.Constants.Type.back}
                                ref= {(metodosDeCamara) => this.metodosDeCamara = metodosDeCamara} 
                            />

                            <TouchableOpacity 
                                style={{}}
                                onPress = { ()=>this.tomarFoto()}
                            >
                                <Text>Tomar Foto</Text>
                            </TouchableOpacity>
                        </View> :
                        
                        <View>
                            {/* Vista previa de la imagen */}
                            <Image 
                                style={{}}
                                source={{uri:this.state.uri}}
                                resizeMode='cover'

                            />
                            {/* Guardar fotor */}
                            <TouchableOpacity 
                                style={{}}
                                onPress={()=>this.guardarFoto()}
                            >
                                <Text>Guardar Foto</Text>
                            </TouchableOpacity>
                            {/* Rechazar foto */}
                            <TouchableOpacity 
                                style={{}}
                                onPress={()=>this.clearFoto()}
                            >
                                <Text>Eliminar</Text>
                            </TouchableOpacity>


                        </View> : 
                        <Text>No Hay permisos para la camara</Text>
            }
        </View>
    )
  }
}
const styles=StyleSheet.create({

})