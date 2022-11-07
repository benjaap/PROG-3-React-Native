import React, {Component} from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from "react-native-web";
import{db, auth } from '../firebase/config';
import firebase from 'firebase';

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
    likear(idDelPosteo){
        db.collection("posts").doc(idDelPosteo).update({
            likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((res)=> console.log(res))
        .catch((err)=>console.log(err))
    }
   
    render(){
       
        return(
             <View>
                <Text>Soy el home</Text>
                <FlatList  
                    data={this.state.posteos}
                    keyExtrator={item => item.id}
                    renderItem={({item})=>
                    (
                        <View>
                            <Text>{item.data.descripcion}</Text>
                            <TouchableOpacity onPress={()=>{this.likear(item.id)}}>
                                 <Text>Dar Like</Text>
                             </TouchableOpacity>
                        </View>
                    )}
                    />
                  
            
                
            </View>
        )
    }
}
export default Home
