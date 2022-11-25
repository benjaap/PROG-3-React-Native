import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import { db, auth } from '../firebase/config';
import Edit from "../components/Edit";



export default class EditPerfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: [],
            bio: '',
            username: ''

        }
    }
    componentDidMount() {
        db.collection("users")
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(
                docs => {
                    let usuario = [];
                    docs.forEach(doc => {
                        usuario.push({
                            id: doc.id,
                            data: doc.data()
                        })
                        this.setState({
                            user: usuario
                        })
                    }

                    )
                }
            )
    }

    




    render() {
        console.log(this.props)
        console.log(this.state.user)

        return (
            <>
                <Text style={style.title}>EDITAR PERFIL</Text>
                <FlatList
                    style={style.container}
                    data={this.state.user}
                    keyExtrator={item => item.id.toString()}
                    renderItem={({ item }) =>
                    (
                        <Edit 
                        info={item}
                        nav={this.props.navigation}
                         />
                    )}
                />



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
})

