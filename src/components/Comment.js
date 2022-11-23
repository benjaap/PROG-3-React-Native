import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Text, StyleSheet, FlatList } from 'react-native';
import { View } from 'react-native-web';

class Comment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            datos: this.props.info


        }
    }







    render() {
        console.log(this.state.datos)
        console.log(this.props.codigo)

        return (
            <>
                <FlatList
                    data={this.state.datos}
                    keyExtrator={item => item.id.toString()}
                    renderItem={({ item }) =>
                    (
                        <>
                            <Text>{item.comment}</Text>
                            <Text>{item.owner}</Text>
                        </>

                    )}
                />


            </>
        )
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
})



export default Comment;