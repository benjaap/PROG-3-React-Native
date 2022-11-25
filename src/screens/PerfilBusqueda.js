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
                <Text style={style.title}>PERFIL</Text>
              
                <FlatList
                  data={this.state.user}
                
                  keyExtractor={ item => item.id.toString() }
                  renderItem= { ({item}) =>(
                    <View>
                        <Text   style={style.comment}>Usuario: {item.data.username}</Text>                  
                        <Text   style={style.comment}>Email: {item.data.email}</Text>
                        <Text   style={style.comment}>Bio: {item.data.bio}</Text>
                        <Text   style={style.comment}>{this.state.posteos.length} posteos</Text>
                        <Text   style={style.comment}>Posteos:</Text>
                            {this.state.posteos.length > 0 ? (
                            <FlatList
                                data={this.state.posteos}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <Post posteo={item} navegacion={this.props.navigation}  />}
                            />
                            ) : (
                            <Text style={style.comment}>Lo sentimos, no hay posteos ☹️</Text>
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