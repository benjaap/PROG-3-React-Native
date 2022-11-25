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
            image:""
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
        console.log(this.props.route.params)
        return (
            <View>
                <Text style={style.title}> Mi PERFIL</Text>

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

const style = StyleSheet.create({
    comment: {
       
        fontSize: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 40,
        backgroundColor: "#EEEFEF",
        width: "fit-content"
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
        marginTop: 40,
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