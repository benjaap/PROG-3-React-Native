import React, { Component } from 'react'
import { auth, db } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class Perfil extends Component {

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
            <Text>Mi perfil</Text>
            <TouchableOpacity onPress={() => this.logOut()}>
                <Text>Cerrar Sesión</Text>
            </TouchableOpacity>
            <text>{this.state.username}</text>
            <text>{auth.currentUser.email}</text>
            {/* <text>{this.state.posts.lenght}</text> */}
            <text>{auth.currentUser.metadata.lastSignInTime}</text>
            

        </View>)
}
}