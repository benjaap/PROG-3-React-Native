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
        this.props.navigation.navigate('Menu', {id:1})
      })
      .catch(err => this.setState({err: err.message}) )
    }

  render() {
    return (
      <View>
        <Text>Ingresar</Text>
        <View>
          <TextInput style={styles.field} placeholder="email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
          <TextInput style={styles.field} placeholder="password" keyboardType="default" secureTextEntry onChangeText={(text) => this.setState({ pass: text })} value={this.state.pass} />
          <Text onPress={() => this.loginUser(this.state.email, this.state.pass)}>Loguearme</Text>
          <Text onPress={() => this.props.navigation.navigate('Register')}>Crear una cuenta</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  field: {},
});

export default Login;
