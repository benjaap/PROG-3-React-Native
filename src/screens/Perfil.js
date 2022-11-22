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

    render() {
        return (
            <View>
                <Text>PERFIL</Text>

                <Text>Usuario: {this.state.username}</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Bio: {this.state.bio}</Text>
                <Text>{this.state.post.lengthj} posteos</Text>
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
            </View>)
    }
}
