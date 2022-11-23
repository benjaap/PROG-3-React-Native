import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet,Image} from "react-native";
import{db, auth } from '../firebase/config';
export default class Comments extends Component{

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
        console.log(this.props)
        console.log(this.state.posteos)
        

        return(
            <Text>Comentarios</Text>
        )
    }
}