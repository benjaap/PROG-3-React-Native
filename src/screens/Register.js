import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from "firebase";




class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            err: '',
            post: '',
            bio: '',



        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user)=> {this.props.navigation.navigate("Menu")})
    }

    

    register(email, password, username, bio, post) {
        auth.createUserWithEmailAndPassword(email, password)
        .then( (res)=> {
            db.collection('users').add ({
                email: email,
                username: username,
                bio: bio,
                post: []
            })   
            .then((res)=> {
                this.setState({
                    email: "",
                    password: "",
                    username: "",
                    bio:"",
                });
                this.props.navigation.navigate("Menu");
            }) }
            )
            .catch(err => this.setState({err: err.message}) )


    }

   


    render() {
        return (
            <>
                <View>
                    <Text>Registro</Text>
                </View>
                <View>
                    <TextInput
                        style={style.campo}
                        placeholder='email'
                        keyboardType="email-addres"
                        onChangeText={userEmail => this.setState({ email: userEmail })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={style.campo}
                        placeholder='contraseña'
                        keyboardType="default"
                        secureTextEntry='true'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password: password})}
                    />
                    <TextInput
                        style={style.campo}
                        placeholder=' Nombre de Usuario'
                        keyboardType="default"
                        value={this.state.username}
                        onChangeText={username => this.setState({ username: username })}
                    />
                    <TextInput
                        style={style.campo}
                        placeholder='Biografia'
                        keyboardType="default"
                        value={this.state.bio}
                        onChangeText={bio => this.setState({ bio: bio })}
                    />
                </View>
                <View>

                    <TouchableOpacity onPress={() => { this.register(this.state.email, this.state.password, this.state.username, this.state.bio, this.state.post) }}>
                        <Text>Registrame</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text> Ya tengo una cuenta</Text>
                    </TouchableOpacity>
                    <Text>{this.state.err}</Text>
                </View>
            </>
        );




    }
}

const style = StyleSheet.create ({
    campo: {
        fontSize: 18,
        borderColor: 'red',
        borderEndWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16
        
    }


})

export default Register;
