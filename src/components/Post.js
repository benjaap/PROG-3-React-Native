import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Text, TextInput, TouchableOpacity, StyleSheet, Image, } from 'react-native';

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
            <>


                <Image
                    style={style.image}
                    source={{ uri: this.props.posteo.data.url }}
                    resizeMode='contain'
                />

                <Text> {this.props.posteo.data.descripcion} </Text>
                <TouchableOpacity onPress={() => { this.likear(this.props.posteo.id) }}>
                    <Text>Dar Like</Text>
                </TouchableOpacity>
                <TextInput
                    style={style.campo}
                    keyboardType='default'
                    placeholder='comenta'
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario}
                />
                <TouchableOpacity onPress={() => { this.agregarComentario(this.props.posteo.id) }} >
                    <Text>Comentar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navegacion.navigate('Comentarios', {id: this.props.posteo.id } )} >
                    <Text>Mas Comentarios</Text>
                </TouchableOpacity>
                



            </>
        )
    }
}

const style = StyleSheet.create({
    campo: {
        fontSize: 18,
        borderColor: 'red',
        borderEndWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16

    },
    image: {
        width: 250,
        height: 250,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }


})



export default Post;

