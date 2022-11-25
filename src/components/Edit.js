import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import { db, auth } from '../firebase/config';



export default class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bio:'',
            user:''


        }
    }
    actualizarDatos() {
        if(this.state.bio == '' && this.state.user == ''){
            db.collection('users')
            .doc(this.props.info.id)
            .update({
                bio: this.props.info.data.bio,
                username: this.props.info.data.username
            })
            .then((res) => {
                this.props.nav.navigate("Menu");
                console.log(res)

            })
        }else if(this.state.bio === ''){
            db.collection('users')
            .doc(this.props.info.id)
            .update({
                bio: this.props.info.data.bio,
                username: this.state.user
            })
            .then((res) => {
                this.props.nav.navigate("Menu");
                console.log(res)

            })  
        }else if(this.state.user === ''){
            db.collection('users')
            .doc(this.props.info.id)
            .update({
                bio: this.state.bio,
                username: this.props.info.data.username
            })
            .then((res) => {
                this.props.nav.navigate("Menu");
                console.log(res)
            })
        }else {
            db.collection('users')
            .doc(this.props.info.id)
            .update({
                bio: this.state.bio,
                username: this.state.user
            })
            .then((res) => {
                this.props.nav.navigate("Menu");
                console.log(res)
            })
        }
        
    }



    render() {
        console.log(this.props)


        return (
            <>
                <TextInput
                    style={style.comment}
                    keyboardType='default'
                    placeholder="EDITAR BIOGRAFIA"
                    onChangeText={text => this.setState({ bio: text })}
                    value={this.state.bio}
                />
                <TextInput
                    style={style.comment}
                    keyboardType='default'
                    placeholder="EDITAR NOMBRE DE USUARIO"
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user}
                />
                <TouchableOpacity onPress={() => { this.actualizarDatos() }}>
                    <Text style={style.buscar}>EDITAR</Text>
                </TouchableOpacity>

            </>
        )
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
        width: 300
    },
    buscar:{
        fontSize: 13,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginLeft: 40, 
        marginTop:15, 
        backgroundColor: "white",
        width: "fit-content",
        padding:5
    },
})