import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, LogBox } from 'react-native';

class Post extends Component {

    constructor(props){
        super(props)
        this.state={
            descripcion:"",
            comentario: ""
        }
    }

    likear(idDelPosteo){
        db.collection("posts").doc(idDelPosteo).update({
            likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((res)=> console.log(res))
        .catch((err)=>console.log(err))
    }

    agregarComentario(idDelPosteo){
        db.collection("posts")
        .doc(idDelPosteo).update({
            comments:firebase.firestore.FieldValue.arrayUnion(this.state.comentario)
        })
        .then(((res)=> {
            this.setState({
                comentario: ""
            });
        }))
        .catch((err)=>console.log(err))
    }

    
    render(){
       
        return(
            <View>
            <Text>{this.props.posteo.descripcion}</Text>
            <TouchableOpacity onPress={()=>{this.likear(this.props.posteo.id)}}>
                 <Text>Dar Like</Text>
             </TouchableOpacity>
             <TextInput
             style={style.campo}
             keyboardType='default'
             placeholder='comenta'
             onChangeText={text => this.setState({comentario: text})}
             value={this.state.comentario}
             />

             <TouchableOpacity onPress={()=> {this.agregarComentario(this.props.posteo.id)} } >
                <Text>Comentar</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Comentarios", {id:idDelPosteo})}}>
                <Text>Comentarios</Text>
             </TouchableOpacity>
        </View>
        )
    }
}

const style = StyleSheet.create ({
    campo: {
        fontSize: 18,
        borderColor: 'red',
        borderEndWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16
        
    }


})



export default Post;
       
