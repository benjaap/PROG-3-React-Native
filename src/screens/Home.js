import React, {Component} from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import{db, auth } from '../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post'
import { ScrollView } from "react-native-web";

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos : [],
           
        }
    }
    componentDidMount(){
        db.collection("posts").onSnapshot(
            docs=>{
            let postsFromDb =[]
            docs.forEach( doc => {
                postsFromDb.push({
                    id: doc.id, 
                    data: doc.data()
                })
                console.log(postsFromDb);
                this.setState({posteos:postsFromDb})
            })
        })
    }
   
   
    render(){
        

        
       
        return(
             <>
                <FlatList  
                    style={style.container}
                    ItemSeparatorComponent={()=>(<View style={{height: 2, backgroundColor: '#B7B9BF', width: 400, alignSelf:'center'}}></View>)}
                    data={this.state.posteos}
                    keyExtrator={item => item.id.toString()}
                    renderItem={({item})=>
                    ( 
                        <Post 
                        posteo={item}
                        navegacion={this.props.navigation}
                        /> 
                    )}
                    />
            </>
        )
    }
}
export default Home
const style = StyleSheet.create({
    container: {
        backgroundColor:'#d9d9d9'

    }
})