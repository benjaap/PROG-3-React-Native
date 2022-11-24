import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Text, TextInput, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import { AutoFocus } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            descripcion: "",
            comentario: ""
        }
    }

    likear(idDelPosteo) {
        db.collection("posts").doc(idDelPosteo).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    dislike(idDelPosteo){
        db.collection("posts").doc(idDelPosteo).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

    }

    agregarComentario(idDelPosteo) {
        db.collection("posts")
            .doc(idDelPosteo).update({
                comments: firebase.firestore.FieldValue.arrayUnion({ comment: this.state.comentario, owner: auth.currentUser.email, createdAt: Date.now() })
            })
            .then(((res) => {
                this.setState({
                    comentario: ""
                });
            }))
            .catch((err) => console.log(err))
    }

    deletePost(){
        let borrar = confirm( "¿Estas seguro? Si borras esta foto no podras recuperarla");
        if (borrar){db.collection("posts").doc(this.props.posteo.id).delete();}
    }

    render(){
       

        return (
            <View style={style.container}>


                <Image
                    style={style.image}
                    source={{ uri: this.props.posteo.data.url }}
                    resizeMode='contain'
                />
                <Text style={style.descripcion}><strong>{this.props.posteo.data.owner}:</strong> {this.props.posteo.data.descripcion} </Text>
                <TouchableOpacity  onPress={() => { this.likear(this.props.posteo.id) } }>
                
                    <Text style={style.comment}>Dar Like ❤️</Text>
                </TouchableOpacity>
                
                <View style={style.comentar}>
                <TextInput
                        
                        style={style.comment}
                        keyboardType='default'
                        placeholder='Haz un comentario ' 
                        onChangeText={text => this.setState({ comentario: text })}
                        value={this.state.comentario}
                />   
                    <TouchableOpacity  onPress={() => { this.agregarComentario(this.props.posteo.id) }} >
                               
                         <Text style={style.comment}>🖋️</Text>
                
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.comment} onPress={() => this.props.navegacion.navigate('Comentarios', {id: this.props.posteo.id } )} >
                    <Text>Ver Más Comentarios  </Text>
                </TouchableOpacity>
                



            </View>
        )
    }
}

const style = StyleSheet.create({
    comment: {
       
        fontSize: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop:10,
        marginLeft:40,
        backgroundColor:"#EEEFEF",
        width:"fit-content"
    },
    comentar:{
        display:"block",
    },
    image: {
        display: "inline-block",
        margin:"auto",
        width: 250,
        height: 220,
    },
    descripcion:{
        fontSize:15,
        borderColor:"black",
        textAlign:'left',
        backgroundColor:"#fff",
        width:250,
        marginTop:10,
        marginLeft:40,

    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: "white",
        margin:20,
        padding:10

    }


})



export default Post;

