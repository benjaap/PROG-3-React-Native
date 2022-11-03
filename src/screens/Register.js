import React, {Component} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



class Regiter extends Component {
    constructor(props){
        super(props)
        
    }
    render(){
        return (
            <>
                <Text>Soy la pagina de Registro</Text>
    
                <TouchableOpacity
                    onPress = {()=> this.props.navigation.navigate('login')} >
                    <Text>Te dirijo para loguearte</Text>
                </TouchableOpacity>
            </>
        );




    }
}

export default Regiter;
