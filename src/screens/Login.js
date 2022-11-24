import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config'; // Importamos auth de Firebase

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
      .signInWithEmailAndPassword(email, pass) // Metododo asincronico provisto por Firebase, requiere los parametros email y pass
      .then((res) => {
        this.props.navigation.navigate('Menu')  // Si se ejecuta correctamente redirige al usuario a Menu
      })
      .catch(err => this.setState({ err: err.message }))
  }

  render() {
    return (
      <View>      {/* Estructura contenedora del "formulario" */}

        <Text style={style.campo}>Ingresar</Text>
        <TextInput      // Permite ingresar texto (importado desde React Native)
          style={style.form}
          placeholder="email"     // Leyenda de referencia
          keyboardType="email-address"    // Tipo de teclado 
          onChangeText={(text) => this.setState({ email: text })}   // Contiene una funcion que guarda los datos en el estado del componente
          value={this.state.email}    // Obtiene la informacion del estado y la muestra en pantalla
        />

        <TextInput
          style={style.form}
          placeholder="password"
          keyboardType="default"
          secureTextEntry
          onChangeText={(text) => this.setState({ pass: text })}
          value={this.state.pass}
        />

        <TouchableOpacity>       {/* Boton para enviar los datos */}
          <Text style={style.campo} onPress={() => this.loginUser(this.state.email, this.state.pass)}>Loguearme</Text>    {/* Evento onPress que ejecuta la funcion loginUser */}
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
    borderColor: 'red',
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
