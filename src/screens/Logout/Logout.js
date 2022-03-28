import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import AsyncStorage from '@react-native-community/async-storage'

import MenuButton from '../../components/UI/MenuButton/MenuButton'

class Logout extends Component {

    logoutHandler = async () => {
        await AsyncStorage.removeItem('@uuid');
        await AsyncStorage.removeItem('@tutorials');
        BackHandler.exitApp();
    }

    render() {
        return (
            <View style={styles.logoutContainer}>
                <Text style={styles.headingText}>Are You sure you want log out and exit application?</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={this.logoutHandler}>
                    <Text style={styles.buttonText}>LOGOUT {'&'} EXIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

Logout.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Logout',
        headerStyle: {
            backgroundColor: '#4a148c'
        },
        headerTintColor: 'white',
        headerRight: (<HeaderButtons HeaderButtonComponent={MenuButton}>
            <Item 
                title='Menu' 
                iconName='ios-menu' 
                onPress={() => {
                    navigationData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    logoutContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    logoutButton: {
        margin: 5,
        width: 200,
        height: 50,
        backgroundColor: '#4a148c',
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default Logout;