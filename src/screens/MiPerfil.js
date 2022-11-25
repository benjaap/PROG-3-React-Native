import React, { Component } from 'react'
import { auth, db } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Post from '../components/Post';
import firebase from 'firebase';

export default class MiPerfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            post: [],
            bio: '',
            loading: true
        }
    }

    componentDidMount() {
        db.collection('users')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(
                docs => {
                    let post = [];
                    docs.forEach(doc => {
                        post.push({
                            id: doc.id,
                            data: doc.data()
                        })
                        this.setState({
                            username: post[0].data.username,
                            bio: post[0].data.bio,
                            loading: false
                        })
                    })
                }
            )

        db.collection('posts')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(
                docs => {
                    let post = [];
                    docs.forEach(doc => {
                        post.push({
                            id: doc.id,
                            data: doc.data()
                        })
                        this.setState({
                            post: post,
                            loading: false
                        })
                    })
                }
            )
    }

    delete(id) {
        let deletePost = db
            .collection('posts')
            .doc(id)
            deletePost.delete()
            
    }

    logOut() {
        auth.signOut();
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View>
                <Text style={style.title}>MI PERFIL</Text>

                <TouchableOpacity style={style.buscar}onPress={() => this.props.navigation.navigate('EditPerfil')}>
                    <Text>EDITAR PERFIL</Text>
                </TouchableOpacity>

                <Text style={style.comment}>Usuario: {this.state.username}</Text>
                <Text style={style.comment}>Email: {auth.currentUser.email}</Text>
                <Text style={style.comment}>Bio: {this.state.bio}</Text>
                <Text style={style.comment}>Posteos:{this.state.post.length}</Text>
                {this.state.post.length > 0 ? (
                    <FlatList
                        data={this.state.post}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>(
                            <>
                                <Post posteo={item} />
                                <TouchableOpacity onPress={() => this.delete(item.id)}>
                                <Text style= {style.buscar}>Borrar Posteo</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    />
                ) : (
                    <Text style={style.comment}>Lo sentimos, no hay posteos ☹️</Text>
                )}
               


                <TouchableOpacity style={style.buscar}onPress={() => this.props.navigation.navigate('LogOut')}>
                    <Text>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>)
    }
}
const style = StyleSheet.create({
    comment: {
       
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 12,
        backgroundColor: "white",
        width: 360
    },
    buscar:{
        fontSize: 13,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        margin: 10,  
        backgroundColor: "white",
        width: 360,
        padding:5
    },
    title:{
        fontSize: 20,
        borderColor: "black",
        textAlign: 'center',
        fontWeight:"bold",
        width: 380,
        marginTop: 10,
        marginLeft:5,
        height:30,
        backgroundColor:"#00c2cb",
        color:"white"

    },
    container: {
        fontSize: 30,
        borderColor: '#B7B9BF',
        textAlign: 'center',
        fontWeight:"bolder",
        width: 380,
        marginTop: 25,
        marginLeft:5,
        backgroundColor:"white",
        padding:15,
        height:"auto",
        borderWidth:3
    }
})