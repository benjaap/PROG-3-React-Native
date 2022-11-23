import React, { Component } from 'react'
import { auth, db } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Post from '../components/Post';

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
        db.collection('posts')
            .where('owner', '==', this.props.route.params.username)
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

        db.collection('users')
            .where('username', '==', this.props.route.params.username)
            .onSnapshot(
                docs => {
                    let userA = {};
                    docs.forEach(doc => {
                        let username = doc.data()
                        userA = {
                            id: doc.id,
                            data: username
                        }
                    })

                    this.setState({
                        username: userA,
                        loading: false
                    })
                })

    }

    render() {
        return (
            <View>
                <Text>PERFIL</Text>

                <Text>Usuario: {this.state.username}</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Bio: {this.state.bio}</Text>
                <Text>Posteos:{this.state.post.length}</Text>
                {this.state.post.length > 0 ? (
                    <FlatList
                        data={this.state.post}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>(
                            <>
                                <Post posteo={item} />
                                <TouchableOpacity onPress={() => this.delete(item.id)}>
                                <text>Borrar Posteo</text>
                                </TouchableOpacity>
                            </>
                        )}
                    />
                ) : (
                    <Text>No hay posteos</Text>
                )}
            </View>)
    }
}
