import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Post from "../components/Post"
export default class PerfilBusqueda extends Component {
    constructor(props){
        super(props)
        this.state={
            user:[],
            posteos: [],
            cargando:true
        }
        console.log(this.props.route)
    }
    componentDidMount(){
        db.collection('users')
            .where('username', '==', this.props.route.params.username)
            .onSnapshot(
                 docs => {
                     let usersFromDB = [];
                     docs.forEach(doc => {
                        let user= doc.data();
                        usersFromDB.push({
                        id: doc.id,
                        data: user
                     })
                     console.log(usersFromDB);
                     this.setState({
                         user:usersFromDB,
                         cargando:false
                     })
                })
            }
        )
        db.collection('posts')
            .where('owner', '==', this.props.route.params.email)
            .orderBy("createdAt", "desc")
            .onSnapshot(
                docs => {
                    let post = [];
                    docs.forEach(doc => {
                        post.push({
                            id: doc.id,
                            data: doc.data()
                        })
                        this.setState({
                            posteos: post,
                            loading: false
                        })
                    })
                }
            )
        }
    render(){
        console.log(this.state.user)
        console.log(this.state.posteos)
       
        return(
           
            <>
                <Text>PERFIL</Text>
              
                <FlatList
                 data={this.state.user}
                  keyExtractor={ item => item.id.toString() }
                  renderItem= { ({item}) =>(
                    <View>
                        <Text>Usuario: {item.data.username}</Text>                  
                        <Text>Email: {item.data.email}</Text>
                        <Text>Bio: {item.data.bio}</Text>
                        <Text>{this.state.posteos.length} posteos</Text>
                        <Text>Posteos:</Text>
                            {this.state.posteos.length > 0 ? (
                            <FlatList
                                data={this.state.posteos}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <Post posteo={item} navegacion={this.props.navigation}  />}
                            />
                            ) : (
                        <Text>No hay posteos</Text>
                )}
                      
                    </View>
                  )}
                  />
                {/* //   <Text>{this.state.post.lengthj} posteos</Text>
                // <Text>Posteos:</Text>
                // {this.state.post.length > 0 ? ( */}
                {/* //     <FlatList */}
                {/* //         data={this.state.post}
                //         keyExtractor={(post) => post.id.toString()}
                //         renderItem={({ item }) => <Post dataPost={item} {...this.props} />}
                //     />
                // ) : (
                //     <Text>No hay posteos</Text>
                // )} */}
            </>)
           
        
           
    }
   
}