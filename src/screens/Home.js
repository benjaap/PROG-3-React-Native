import React, {Component} from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from "react-native-web";
import{db, auth } from '../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post'

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos : [],
           
        }
    }
    componentDidMount(){
        db.collection("posts").onSnapshot(docs=>{
            let postsFromDb=[]
            docs.forEach((doc)=>{
                let post= doc.data();
                postsFromDb.push({id:doc.id, data:post})
            });
            console.log(postsFromDb);
            this.setState({posteos:postsFromDb})
        })
    }
   
   
    render(){
       
        return(
             <View>
                <Text>Soy el home</Text>
                <FlatList  
                    data={this.state.posteos}
                    keyExtrator={item => item.id.toString()}
                    renderItem={({item})=>
                    (
                    <Post posteo={item}/>
                            
                    )}
                    />
                  
            
                
            </View>
        )
    }
}
export default Home
