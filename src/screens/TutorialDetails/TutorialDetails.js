import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import PieChart from '../../components/UI/PieChart/PieChart' 

class TutorialDetails extends Component {
    state = {
        tutorial: null
    }

    async componentDidMount() {
        const tutorialData = await this.props.navigation.getParam('tutorialData')
        this.setState({
            tutorial: tutorialData
        })
        //Ubacit graf o polaganju, koristiti library react-native-chart-kit
    }

    startTutorialHandler = async () => {
        const tutorialsStorage = await AsyncStorage.getItem('@tutorials')
        const userTutorials = JSON.parse(tutorialsStorage)
        
        const currentTutorialsStats = userTutorials.find((stats) => stats.uid === this.state.tutorial.uid);
        const date = new Date();

        if (currentTutorialsStats.dateFinished !== null) {
            const dateFinished = new Date(currentTutorialsStats.dateFinished)
            const available = this.isTutorialAvailable(dateFinished, date)
            
            if (available) {
                this.props.navigation.replace('Exercise', {
                    tutorial: this.state.tutorial,
                    tutorialsStats: userTutorials
                })
            }
            else {
                alert('You must wait for 30 days to restart tutorial')
                return
            }
        }
        
    }

    isTutorialAvailable = (finishedDate, dateNow) => {
        const finished = finishedDate.getTime();
        const now = dateNow.getTime();
        const difference = (now - finished) / 30 / 24 / 3600 / 1000
        if (difference < 1) {
            return false
        }
        return true
    }

    render() {
        return (
            <ScrollView>
                {this.state.tutorial !== null ? (
                    <View>
                        <Image
                            style={styles.coverImage}
                            resizeMode='contain'
                            source={{ uri: this.state.tutorial.coverImage }} />
                        <Text style={styles.description}>{this.state.tutorial.description}</Text>
                        <View style={styles.content}>
                            <Text style={styles.contentHeader}>CONTENT</Text>
                            <FlatList 
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.tutorial.lessons}
                                renderItem={(lesson) => {
                                    return(
                                        <View key={lesson.index} style={styles.lessonContainer}>
                                            <Text style={styles.lessonName}>{`${lesson.index + 1}. ${lesson.item.name}`}</Text>
                                            <Text style={styles.lessonDescription}>{lesson.item.description}</Text>
                                        </View>
                                )}} />
                            <View style={styles.tutorialStatistics}>
                                <Text style={styles.contentHeader}>USERS ACHIEVEMENTS</Text>
                                <PieChart data={[
                                    { name: 'Not finished', users: 11, color: 'white', legendFontColor: '#4a148c', legendFontSize: 15 },
                                    { name: 'Failed', users: 13, color: '#6699ff', legendFontColor: '#4a148c', legendFontSize: 15 },
                                    { name: 'Evaluated 2', users: 7, color: '#009973', legendFontColor: '#4a148c', legendFontSize: 15 },
                                    { name: 'Evaluated 3', users: 13, color: '#800000', legendFontColor: '#4a148c', legendFontSize: 15 },
                                    { name: 'Evaluated 4', users: 9, color: '#333300', legendFontColor: '#4a148c', legendFontSize: 15 },
                                    { name: 'Evaluated 5', users: 5, color: '#ffcc00', legendFontColor: '#4a148c', legendFontSize: 15 }
                                ]} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.startButton} onPress={this.startTutorialHandler}>
                            <Text style={styles.startButtonText}>START TUTORIAL</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <ActivityIndicator size={50} />
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    coverImage: {
        width: '90%',
        height: 180,
        margin: 'auto',
        marginTop: 20,
        alignSelf: 'center'
    },
    description: {
        width: '90%',
        margin: 'auto',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 16,
        alignSelf: 'center'
    },
    content: {
        flex: 1,
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#e4d2f9'
    },
    contentHeader: {
        textAlign: 'center', 
        fontSize: 18, 
        color: '#4a148c',
        fontWeight: 'bold'
    },
    lessonContainer: {
        flex: 1,
        marginTop: 5
    },
    lessonName: {
        width: '100%',
        backgroundColor: '#4a148c',
        color: 'white',
        marginBottom: 3,
        fontSize: 18,
        paddingLeft: 3
    },
    lessonDescription: {
        marginLeft: 20,
        textAlign: 'left'
    },
    tutorialStatistics: {
        marginTop: 30
    },
    startButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#4a148c',
        borderWidth: 2,
        justifyContent: 'center',
        marginTop: 30
    },
    startButtonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})

TutorialDetails.navigationOptions = (navigationData) => {
    const tutorial = navigationData.navigation.getParam('tutorialData');
    return {
        headerTitle: tutorial.name,
        headerStyle: {
            backgroundColor: '#4a148c'
        },
        headerTintColor: 'white'
    }
}

export default TutorialDetails;