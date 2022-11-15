import React, { Component } from 'react'
import { auth, db } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Post from '../components/Post';

export default class MiPerfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            post: [],
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
                            posts: post,
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
                <Text>Tenes{this.state.post.lengthj} posteos</Text> 
                <Text>Posteos:</Text>
                {this.state.post.length > 0 ? (
                    <FlatList
                        data={this.state.post}
                        keyExtractor={(post) => post.id.toString()}
                        renderItem={({ item }) => <Post dataPost={item} {...this.props} />}
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