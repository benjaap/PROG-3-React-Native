import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet,Image, FlatList} from "react-native";
import{db, auth } from '../firebase/config';
import Comment from '../components/Comment'


export default class Comments extends Component{

    constructor(props){
        super(props)
        this.state={
            comment :[],
           
        }
    }
    componentDidMount(){
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot( doc => {
            this.setState({
                comment: doc.data().comments
            })
            console.log(this.state.comment)
        }

        )



    }
    render(){
        console.log(this.props.route.params.id)
        
        return(
            <>
            <FlatList
            data={this.state.comment}
            keyExtrator={item => item.createdAt}
            renderItem={({item}) => (
                <>
                <Text>{item.comment}</Text>
                </>



            )}
            />

            </>
        )
    }
}

 