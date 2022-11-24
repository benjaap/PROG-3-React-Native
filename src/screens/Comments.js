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
                <FlatList
                    data={this.state.comment}
                    keyExtractor={item => item.createdAt}
                    renderItem={({ item }) => (
                        <View>
                            {auth.currentUser.email === item.owner ? (
                                <>
                                    <Text>Comentaste: </Text>
                                    <Text>{item.comment}</Text>
                                </>
                            ) : (
                                <>
                                    <Text>{item.owner} comento: </Text>
                                    <Text>{item.comment}</Text>
                                </>)
                            }
                        </View>

                    )}
                />

            </>
        )
    }
}

