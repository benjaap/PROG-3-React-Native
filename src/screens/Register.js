import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { db, auth, storage } from '../firebase/config';
import firebase from "firebase";
import * as ImagePicker from 'expo-image-picker';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            post: '',
            bio: '',
            error: {
                email: '',
                password: '',
                username:''
            },
            showCamera:true,
            image:'',
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

        //Hago el fetch para sacar la imagen
        // fetch(this.state.image)
        // .then(res=>res.blob())
        // .then(image=>{
        //     const ref = storage.ref(`perfil/${Date.now()}.jpg`)
        //     ref.put(image)
        //     .then(()=>{
        //         ref.getDownloadURL()
        //         .then(()=>{
        //             this.onImageUpload(image)

        //         })
        //     })
        // })
        // .catch(err => console.log(err))

        auth.createUserWithEmailAndPassword(email, password)
        .then( (res)=> {
            db.collection('users').add ({
                email: email,
                username: username,
                bio: bio,
                post:[],
                image:image
                
            })   
            /* res.user.updateProfile({
                displayName: username,
            }) */
            .then((res)=> {
                this.setState({
                    email: "",
                    password: "",
                    username: "",
                    bio:"",
                    image:""
                });
                this.props.navigation.navigate("Login");
            }) }
            )
            .catch(err => this.setState({ err: err.message }))

        
    }
    onImageUpload(image){
        this.setState({image: image}, () => {console.log(this.state.image)}
        ) 
    }

	image(){
        ImagePicker.getMediaLibraryPermissionsAsync() 
        .then(()=>this.setState({
            permission: true
        }))
        .catch(error =>console.log(error))
        
        let image = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        .then((res) => {
            this.state.navigation.navigate("Perfil", {image: this.state.image})
        })
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
                    <TouchableOpacity 
                        style={style.campo}
                        onPress={()=>{this.image()}}>
                        <Text>Elegí tu foto de perfil</Text>
                    </TouchableOpacity>

                </View>
                <View>
                 {this.state.email.length == 0 || this.state.password.length == 0 || this.state.username.length == 0?

                    <TouchableOpacity onPress={() => { this.register(this.state.email, this.state.password, this.state.username, this.state.bio, this.state.post, this.state.image) }}>
                        <Text>Registrame</Text>
                    </TouchableOpacity>
                     :

                     <TouchableOpacity 
                         onPress={()=>{this.register(this.state.email, this.state.password, this.state.username, this.state.bio, this.state.image)}}
                         style={style.button}
                     >
                         <Text style={style.buttonText}>Registrarme</Text>
                     </TouchableOpacity>
                     }
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
