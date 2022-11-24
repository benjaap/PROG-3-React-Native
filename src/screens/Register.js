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
            error: {
                email: '',
                password: '',
                username:''
            }
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => { this.props.navigation.navigate('Menu') })
    }

    register(email, password, username, bio, post) {
        if (this.state.email.length == 0) {
            this.setState({ error: { email: 'Tenes que ingresar tu email', password: '', username: '' } })
            return
        }
        else if (this.state.password.length == 0) {
            this.setState({ error: { email: '', password: 'Tenes que ingresar tu contraseña', username: '' } })
            return
        }
        else if (this.state.username.length == 0) {
            this.setState({ error: { email: '', password: '', username: 'Ingresa un nombre de usuario' } })
            return
        }
        this.setState({ error: { email: '', password: '', username:'' } })

        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                db.collection('users').add({
                    email: email,
                    username: username,
                    bio: bio,

                })
                    .then((res) => {
                        this.setState({
                            email: "",
                            password: "",
                            username: "",
                            bio: "",
                        });
                        this.props.navigation.navigate("Menu");
                    })
            }
            )
            .catch(err => this.setState({ err: err.message }))


    }

    render() {
        console.log(this.props.navigation)

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
                    <Text>
                        {this.state.error.email && 'Tenes que ingresar una direccion de email'}
                    </Text>
                    <TextInput
                        style={style.campo}
                        placeholder='contraseña'
                        keyboardType="default"
                        secureTextEntry='true'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password: password })}
                    />
                    <Text>
                        {this.state.error.password && 'Tenes que ingresar una contraseña'}
                    </Text>
                    <TextInput
                        style={style.campo}
                        placeholder='Nombre de Usuario'
                        keyboardType="default"
                        value={this.state.username}
                        onChangeText={username => this.setState({ username: username })}
                    />
                    <Text>
                        {this.state.error.username && 'Tenes que ingresar una nombre de usuario'}
                    </Text>
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

const style = StyleSheet.create({
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
