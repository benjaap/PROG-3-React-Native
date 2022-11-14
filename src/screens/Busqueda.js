import React, { Component } from 'react'
import { db } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default class Busqueda extends Component {

    constructor(props){
        super(props)
        this.state={
            busqueda:"",
            cargando:true,
            users:[],
            resultados:[],
            sugeridos:[]
        }
    }
    componentDidMount(){
        db.collection("users").onSnapshot(docs=>{
            let usersFromDB=[]
            docs.forEach((doc)=>{
               let users= doc.data();
                usersFromDB.push({id:doc.id, data:users})
            });
            console.log(usersFromDB);
            this.setState({
                users:usersFromDB,
                sugeridos:usersFromDB.slice(4),
                cargando:false
            })

            
        })
      

    
    }
    busqueda(filtro){
        if(filtro !== ""){
            let resultados= this.state.users.filter((user) =>{
                console.log(user)
                return user.data.username.toUpperCase()
                    .includes(filtro.toUpperCase())
                
            })
            this.setState({
                resultados:resultados
            })
        console.log(resultados)}
        
    }
    
    render (){
        return(
           
            <View>
                <TextInput
                    placeholder="Buscar usuarios"
                    keyboardType="default"
                    onChangeText={(text)=>{this.busqueda(text)}}>
                 </TextInput>
                 <TouchableOpacity onPress={()=>{this.busqueda(this.state.busqueda)}}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
                
               
            {this.state.resultados.length === 0?
                 <>
                  <Text>Perfiles sugeridos</Text> 
                  
                  <FlatList
                  data={this.state.sugeridos}
                  keyExtractor={ item => item.id.toString() }
                  renderItem={ ({item}) => (
                      <View>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Perfil")}}>
                         <Text>{item.data.username}</Text>
                       </TouchableOpacity>
                      </View>
                      )}
                  />
                </>
                :  <FlatList
                data={ this.state.resultados }
                keyExtractor={ item => item.id.toString() }
                renderItem={ ({item}) => (
                    <View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Perfil")}}>
                       <Text>{item.data.username}</Text>
                     </TouchableOpacity>
                    </View>
                    )}
                    
        />}
               
                
          
               
                       
                
            </View>
                
            )
            
            
            
    }
}