import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'; 
import { auth } from '../firebase/config'; 

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
    };
  }

  loginUser(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass) 
      .then((res) => {
        this.props.navigation.navigate('Menu')  
      })
      .catch(err => this.setState({ err: err.message }))
  }

  render() {
    return (
      <View>    

        <Text style={style.campo}>Ingresar</Text>
        <TextInput      
          style={style.form}
          placeholder="email"     
          keyboardType="email-address"  
          onChangeText={(text) => this.setState({ email: text })}   
          value={this.state.email}    
        />

        <TextInput
          style={style.form}
          placeholder="password"
          keyboardType="default"
          secureTextEntry
          onChangeText={(text) => this.setState({ pass: text })}
          value={this.state.pass}
        />

        <TouchableOpacity>     
          <Text style={style.campo} onPress={() => this.loginUser(this.state.email, this.state.pass)}>Loguearme</Text>    
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={style.campo} onPress={() => this.props.navigation.navigate('Register')}>Crear una cuenta</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const style = StyleSheet.create({
  campo: {
    fontSize: 18,
    borderColor: 'blue',
    borderEndWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 16
  },

  form: {
    fontSize: 14,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 8,
    width: 280
  }


})

export default Login;
