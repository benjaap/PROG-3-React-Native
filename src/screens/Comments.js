import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import { db, auth } from '../firebase/config';



export default class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: [],

        }
    }
    componentDidMount() {
        db.collection("posts")
            .doc(this.props.route.params.id)
            .onSnapshot(doc => {
                this.setState({
                    comment: doc.data().comments
                })
                console.log(this.state.comment)
            }

            )



    }
    render() {
        console.log(this.props.route.params.id)

        return (
            <>
            <Text style={style.title}>COMENTARIOS</Text>
                <FlatList
                    data={this.state.comment}
                    style={style.container}
                    ItemSeparatorComponent={()=>(<View style={{height: 2, backgroundColor: '#B7B9BF', width: 400, alignSelf:'center'}}></View>)}
                    keyExtractor={item => item.createdAt}
                    renderItem={({ item }) => (
                        <View>
                            {auth.currentUser.email === item.owner ? (
                                <>
                                    <Text style={style.descripcion}>Comentaste: </Text>
                                    <Text style={style.descripcion}>{item.comment}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={style.descripcion}><strong>{item.owner} </strong>comento: </Text>
                                    <Text style={style.descripcion} >{item.comment}</Text>
                                    
                                </>)
                            }
                        </View>

                    )}
                />

            </>
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
    descripcion: {
        fontSize: 15,
        borderColor: "black",
        textAlign: 'left',
        backgroundColor: "#fff",
        width: 250,
        marginTop: 10,
        marginLeft: 40,
      
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
