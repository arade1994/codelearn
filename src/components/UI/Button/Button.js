import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native' 

const button = (props) => {
    const content = (
        <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]}>
            <Text style={props.disabled ? styles.disabledText : {color: 'white'}}>{props.children}</Text>
        </View>
    )
    if(props.disabled) {
        return content;
    }
    if(Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        alignItems: 'center'
    },
    disabled: {
        backgroundColor: "#d9d9d9",
        borderColor: "grey"
    },
    disabledText: {
        color: "#999999"
    }
})

export default button