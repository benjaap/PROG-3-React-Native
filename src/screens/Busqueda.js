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
                    placeholder="INGRESE EL NOMBRE DEL USURIO QUE QUIERAS BUSCAR. "
                    keyboardType="default"
                    style={style.buscar}
                    onChangeText={(text)=>{this.busqueda(text)}}>
                 </TextInput>
                 <TouchableOpacity style={style.comment} onPress={()=>{this.busqueda(this.state.busqueda)}}>
                    <Text>BUSCAR 🔍</Text>
                </TouchableOpacity>
                
               
            {this.state.resultados.length === 0?
                 <>
                  <Text style={style.title}>PERFILES SUGERIDOS</Text> 
                  
                  <FlatList
                  data={this.state.sugeridos}
                  keyExtractor={ item => item.id.toString() }
                  style={style.container}
                  ItemSeparatorComponent={()=>(<View style={{height: 2, backgroundColor: '#B7B9BF', width: 400, alignSelf:'center',margin:25}}></View>)}
                  renderItem={ ({item}) => (
                      <View>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("PerfilBusqueda", {
                        username: item.data.username,
                        email:item.data.email,
                        bio:item.data.bio,

                         })}}>
                         <Text>{item.data.username}</Text>
                       </TouchableOpacity>
                      </View>
                      )}
                  />
                </>
                :  <FlatList
                style={style.container}
                data={ this.state.resultados }
                keyExtractor={ item => item.id.toString() }
                ItemSeparatorComponent={()=>(<View style={{height: 2, backgroundColor: '#B7B9BF', width: 400, alignSelf:'center'}}></View>)}
                renderItem={ ({item}) => (
                    <View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("PerfilBusqueda", 
                        {username: item.data.username,
                        email:item.data.email,
                        bio:item.data.bio,
                    })}}>
                       <Text>{item.data.username}</Text>
                     </TouchableOpacity>
                    </View>
                    )}
                    
        />}
               
                
          
               
                       
                
            </View>
                
            )
            
            
            
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
        width: "fit-content"
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
        backgroundColor:"#00c2cb"

    },
    container: {
        fontSize: 30,
        borderColor: '#B7B9BF',
        textAlign: 'center',
        fontWeight:"bolder",
        width: 380,
        marginTop: 25,
        marginLeft:5,
        backgroundColor:"white",
        padding:15,
        height:"auto",
        borderWidth:3
    }
})