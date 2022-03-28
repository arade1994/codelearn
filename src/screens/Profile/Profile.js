import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { connect } from 'react-redux'

import MenuButton from '../../components/UI/MenuButton/MenuButton'
import Card from '../../components/UI/Card/Card'
import ProgressChart from '../../components/UI/ProgressChart/ProgressChart'

class Profile extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.usernameWithPicture}>
                    <Text style={styles.username}>{this.props.userData.username}</Text>
                    <Text style={styles.userPicture}>{this.props.userData.firstName[0]}</Text>
                </View>
                <View>
                    <Card propertyName='FIRST NAME' propertyValue={this.props.userData.firstName} />
                    <Card propertyName='LAST NAME' propertyValue={this.props.userData.lastName} />
                    <Card propertyName='AGE' propertyValue={this.props.userData.age} />
                    <Card propertyName='COUNTRY' propertyValue={this.props.userData.country} />
                    <Card propertyName='CITY' propertyValue={this.props.userData.city} />
                    <Card propertyName='EMAIL' propertyValue={this.props.userData.email} />
                </View>
                <View style={styles.userTutorials}>
                    <Text style={styles.tutorialsHeader}>YOUR TUTORIALS</Text>
                    <Text style={styles.tutorialName}>JavaScript For Beginners</Text>
                    <ProgressChart 
                        data={{
                        labels: ['Progress'],
                        data: [0.73]
                    }} />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        
    },
    usernameWithPicture: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    userPicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 2,
        margin: 'auto',
        fontSize: 34,
        fontWeight: 'bold',
        backgroundColor: '#4a148c',
        color: 'white',
        marginLeft: 3
    },
    userTutorials: {
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
        backgroundColor: '#e4d2f9'
    },
    tutorialsHeader: {
        textAlign: 'center', 
        fontSize: 18, 
        color: '#4a148c',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#4a148c'
    },
    tutorialName: {
        margin: 3,
        color: '#4a148c',
        fontWeight: 'bold',
        fontSize: 16
    }
})

Profile.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Profile',
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

const mapStateToProps = state => {
    return {
        userData: state.auth.userData
    }
}

export default connect(mapStateToProps)(Profile);