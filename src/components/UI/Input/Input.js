import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const input = (props) => {
    return (
        <TextInput
            underlineColorAndroid="transparent"
            {...props}
            style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]} />
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        borderColor: "#eee"
    },
    invalid: {
        backgroundColor: "#ffb3b3",
        borderColor: "#ff6666"
    }
})

export default input