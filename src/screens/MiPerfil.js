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

    logOut() {
        auth.signOut();
        this.props.navigation.navigate("Register")
    }

    render() {
        return (
            <View>
                <Text>MI PERFIL</Text>

                <Text>Usuario: {this.state.username}</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Bio: {this.state.bio}</Text>
                <Text>Posteos:{this.state.post.length}</Text>
                {this.state.post.length > 0 ? (
                    <FlatList
                        data={this.state.post}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                        (
                            <Post posteo={item} />
                        )}
                    />
                ) : (
                    <Text>No hay posteos</Text>
                )}
                <TouchableOpacity onPress={() => this.logOut()}>
                    <Text>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>)
    }
}
