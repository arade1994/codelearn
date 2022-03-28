import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const card = (props) => (
    <View style={styles.card}>
        <Text style={styles.propertyName}>{props.propertyName}</Text>
        <Text style={styles.propertyValue}>{props.propertyValue}</Text>
    </View>
)

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 60,
        borderWidth: 2,
        borderColor: '#4a148c',
        backgroundColor: '#e4d2f9',
        marginBottom: 5
    },
    propertyName: {
        color: '#4a148c'
    },
    propertyValue: {
        padding: 5,
        paddingLeft: 20,
        fontSize: 18,
        fontFamily: 'sans-serif'
    }
})

export default card;