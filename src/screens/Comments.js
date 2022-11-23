import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet,Image, FlatList} from "react-native";
import{db, auth } from '../firebase/config';
import Comment from '../components/Comment'


export default class Comments extends Component{

    constructor(props){
        super(props)
        this.state={
            posteos : [],
           
        }
    }
    componentDidMount(){
        db.collection("posts").onSnapshot(docs=>{
            let postsFromDb =[]
            docs.forEach( (doc) => {
                postsFromDb.push({
                    id: doc.id, 
                    data: doc.data()
                })
               /*console.log(postsFromDb);*/
                this.setState({posteos:postsFromDb})
            })
        })
    }
   



    render(){
        /*console.log(this.props.route.params.id)
        console.log(this.state.posteos)*/
       
        

        return(
            <>
            <FlatList  
                    data={this.state.posteos}
                    keyExtrator={item => item.id.toString()}
                    renderItem={({item})=>
                    ( 
                        <Comment
                        info={item.data.comments}
                        match={this.props.route.params.id}
                        
                        

                        />
                    )}
                    />
            
            
            



            </>
        )
    }
}


