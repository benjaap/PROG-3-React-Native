import React, { Component } from 'react'
import { auth, db } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Post from '../components/Post';
import firebase from 'firebase';

export default class MiPerfil extends Component {

    logOut() {
        auth.signOut();
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.logOut()}>
                    <Text>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }

}