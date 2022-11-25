import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'; 
import { auth } from '../firebase/config'; 

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      error: {
        email:'',
        pass:''
      }
    };
  }

  loginUser(email, pass) {
    if(this.state.email.length == 0){
      this.setState({error: {email: 'Tenes que ingresar tu email', pass: ''}})
      return
    }
    else if(this.state.pass.length == 0){
      this.setState({error: {email: '', pass: 'Tenes que ingresar tu contraseña'}})
      return
    }
    this.setState({error:{email:'', pass:''}})

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

        <Text style={style.title}>Ingresar</Text>
        <TextInput      
          style={style.buscar}
          placeholder="EMAIL"     
          keyboardType="email-address"  
          onChangeText={(text) => this.setState({ email: text })}   
          value={this.state.email}    
        />
        <Text>
          {this.state.error.email && 'Tenes que ingresar tu email'}
        </Text>

        <TextInput
          style={style.buscar}
          placeholder="CONTRASEÑA"
          keyboardType="default"
          secureTextEntry
          onChangeText={(text) => this.setState({ pass: text })}
          value={this.state.pass}
        />
        <Text style={style.descripcion}>
          {this.state.error.pass && 'Tenes que ingresar tu contraseña'}
        </Text>

        <TouchableOpacity>     
          <Text style={style.comment} onPress={() => this.loginUser(this.state.email, this.state.pass)}>Loguearme</Text>    
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={style.comment} onPress={() => this.props.navigation.navigate('Register')}>Crear una cuenta</Text>
        </TouchableOpacity>

      </View>
    );
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
    width: 150
},
  campo: {
    fontSize: 18,
    borderColor: 'blue',
    borderEndWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 16
  },
  buscar:{
    fontSize: 13,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    margin: 10,  
    backgroundColor: "white",
    width: 360,
    padding:5
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
descripcion: {
  fontSize: 15,
  borderColor: "black",
  textAlign: 'left',
  backgroundColor: "#fff",
  width: 250,
  marginTop: 10,
  marginLeft: 40,

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
