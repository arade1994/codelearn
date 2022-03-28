import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import { updateUserData } from '../../store/actions/users'
import { updateTutorials } from '../../store/actions/tutorials'

class Exercise extends React.Component {
    state = {
        tutorialId: null,
        currentExercise: null,
        currentQuestion: null,
        answer: null,
        resetedAnswer: null,
        code: null,
        userAnswer: null,
        writingInput: '',
        answerSubmited: false,
        tutorialData: null,
        exerciseLoaded: false,
        tutorialFinished: false
    }

    async componentDidMount() {
        const tutorial = this.props.navigation.getParam('tutorial')
        const tutorials = this.props.navigation.getParam('tutorialsStats')
       
        this.setState({
            tutorialId: tutorial.uid,
            tutorialData: tutorial
        })

        if (tutorials === null) {
            const userTutorials = [];
            userTutorials.push({
                uid: tutorial.uid,
                name: tutorial.name,
                correctAnswers: 0,
                takenQuestions: 0,
                lessonId: 0,
                exerciseId: 0,
                dateStarted: new Date(),
                dateFinished: null
            })
            await AsyncStorage.setItem('@tutorials', JSON.stringify(userTutorials))
            this.startTutorial(tutorial)
        }
        else {
            const tutorialIds = tutorials.map(tut => tut.uid)
            if (!tutorialIds.includes(tutorial.uid)) {
                tutorials.push({
                    uid: tutorial.uid,
                    name: tutorial.name,
                    correctAnswers: 0,
                    takenQuestions: 0,
                    lessonId: 0,
                    exerciseId: 0,
                    dateStarted: new Date(),
                    dateFinished: null
                })
                await AsyncStorage.setItem('@tutorials', JSON.stringify(tutorials))
                this.startTutorial(tutorial)
            }
            else {
                const tutorialStats = tutorials.find(tut => tut.uid === tutorial.uid)
                this.continueTutorial(tutorial, tutorialStats)
            }
        }
    }

    startTutorial = (tutorial) => {
        this.setState({
            currentExercise: tutorial.lessons[0].exercises[0].name,
            currentQuestion: tutorial.lessons[0].exercises[0].question,
            answer: tutorial.lessons[0].exercises[0].answer,
            userAnswer: tutorial.lessons[0].exercises[0].code,
            resetedAnswer: tutorial.lessons[0].exercises[0].code,
            code: tutorial.lessons[0].exercises[0].code,
            exerciseLoaded: true
        })
    }

    continueTutorial = (tutorial, tutorialStats) => {
        this.setState({
            currentExercise: tutorial.lessons[tutorialStats.lessonId].exercises[tutorialStats.exerciseId].name,
            currentQuestion: tutorial.lessons[tutorialStats.lessonId].exercises[tutorialStats.exerciseId].question,
            answer: tutorial.lessons[tutorialStats.lessonId].exercises[tutorialStats.exerciseId].answer,
            userAnswer: tutorial.lessons[tutorialStats.lessonId].exercises[tutorialStats.exerciseId].code,
            resetedAnswer: tutorial.lessons[tutorialStats.lessonId].exercises[tutorialStats.exerciseId].code,
            code: tutorial.lessons[tutorialStats.lessonId].exercises[tutorialStats.exerciseId].code,
            exerciseLoaded: true
        })
    }

    updateAnswer = async (tutorialData, tutorialStats, correct) => {
        const currentTutorial = tutorialStats.find(tutorial => tutorial.uid === this.state.tutorialId)
        const updatedTutorial = {...currentTutorial}
        const currentTutorialIndex = tutorialStats.indexOf(currentTutorial)

        const correctAnswers = currentTutorial.correctAnswers
        const takenQuestions = currentTutorial.takenQuestions
        let lessonId = currentTutorial.lessonId
        let exerciseId = currentTutorial.exerciseId

        const numOfCurrentLessonExercises = tutorialData.lessons[lessonId].exercises.length

        if (exerciseId === numOfCurrentLessonExercises - 1) {
            lessonId++
            exerciseId = 0
        }
        else {
            exerciseId++
        }

        updatedTutorial.correctAnswers = correct ? correctAnswers + 1 : correctAnswers
        updatedTutorial.takenQuestions = takenQuestions + 1
        updatedTutorial.lessonId = lessonId
        updatedTutorial.exerciseId = exerciseId
        tutorialStats[currentTutorialIndex] = updatedTutorial
        await AsyncStorage.setItem('@tutorials', JSON.stringify(tutorialStats))
    }

    submitAnswer = async () => {
        this.setState({
            answerSubmited: true
        })

        const tutorialsStorage = await AsyncStorage.getItem('@tutorials')
        const tutorialStats = JSON.parse(tutorialsStorage)

        if (this.state.answer === this.state.userAnswer) {
            this.updateAnswer(this.state.tutorialData, tutorialStats, true)

            alert('Correct answer');
        }
        else {
            this.updateAnswer(this.state.tutorialData, tutorialStats, false)

            alert('Wrong answer');
        }
    }

    showAnswer = () => {
        this.setState({
            userAnswer: this.state.answer
        })
    }

    codeHandler = (value) => {
        this.setState({
            userAnswer: value
        })
    }

    resetCode = () => {
        this.setState({
            userAnswer: this.state.resetedAnswer
        })
    }

    nextExercise = async () => {
        const tutorialsStorage = await AsyncStorage.getItem('@tutorials')
        const tutorialsStats = JSON.parse(tutorialsStorage)

        const currentTutorial = tutorialsStats.find((tutorial) => tutorial.uid === this.state.tutorialId);
        const currentTutorialIndex = tutorialsStats.indexOf(currentTutorial);

        const tutorialData = this.state.tutorialData
        if (tutorialsStats[currentTutorialIndex].lessonId == tutorialData.lessons.length) {
            await this.tutorialFinishedHandler(tutorialsStats)
        }
        else {
            this.props.navigation.replace('Exercise', {
                tutorial: this.state.tutorialData,
                tutorialsStats: tutorialsStats
            })
        }
    }

    updateTutorialStatistics = (tutorial, tutorialStats) => {
        const correctAnswers = tutorialStats.correctAnswers
        const takenQuestions = tutorialStats.takenQuestions

        if (correctAnswers / takenQuestions < 0.5) {
            tutorial.statistic.failed += 1
        }
        else if (correctAnswers / takenQuestions >= 0.5 && correctAnswers / takenQuestions < 0.7) {
            tutorial.statistic.evaluated2 += 1
        }
        else if (correctAnswers / takenQuestions >= 0.7 && correctAnswers / takenQuestions < 0.8) {
            tutorial.statistic.evaluated3 += 1
        }
        else if (correctAnswers / takenQuestions >= 0.8 && correctAnswers / takenQuestions < 0.9) {
            tutorial.statistic.evaluated4 += 1
        }
        else {
            tutorial.statistic.evaluated5 += 1
        }

        return tutorial
    }

    tutorialFinishedHandler = async (tutorialsStats) => {
        const uuid = await AsyncStorage.getItem('@uuid');

        const currentTutorial = tutorialsStats.find((tutorial) => tutorial.uid === this.state.tutorialId);
        const currentTutorialIndex = tutorialsStats.indexOf(currentTutorial);
        currentTutorial.dateFinished = new Date()
        currentTutorial.lessonId = 0
        currentTutorial.exerciseId = 0
        tutorialsStats[currentTutorialIndex] = currentTutorial
        
        await AsyncStorage.setItem('@tutorials', JSON.stringify(tutorialsStats));
        await this.props.updateUserData(uuid, tutorialsStats);

        const allTutorials = [...this.props.tutorials];
        let updatedTutorial = allTutorials.find((tutorial) => tutorial.uid === this.state.tutorialId)
        const tutorialIndex = allTutorials.indexOf(updatedTutorial)
      
        updatedTutorial = this.updateTutorialStatistics(updatedTutorial, currentTutorial)
        allTutorials[tutorialIndex] = updatedTutorial;
        
        await this.props.updateTutorials(allTutorials)

        alert('You finished tutorial. Go to home to see your results!')

        this.props.navigation.replace('Tutorials');
    }

    exitTutorial = () => {
        this.props.navigation.replace('Tutorials')
    }

    render() {
        if (this.state.exerciseLoaded) {
            return (
                <View style={styles.container}>
                    <View>
                        <Text style={styles.exerciseTitle}>{this.state.currentExercise}</Text>
                        <Text style={styles.assignment}>{this.state.currentQuestion}</Text>
                    </View>
                    <TextInput 
                        multiline={true}
                        numberOfLines={2}
                        style={styles.input}
                        value={this.state.userAnswer}
                        onChangeText={this.codeHandler}/>
                    <View style={styles.buttonsContainer}>
                        {!this.state.answerSubmited ? (
                            <TouchableOpacity style={styles.button} onPress={this.submitAnswer}>
                                <Text style={styles.buttonText}>SUBMIT</Text>
                            </TouchableOpacity>
                        ) : null}
                        {this.state.answerSubmited ? (
                            <TouchableOpacity 
                                disabled={!this.state.answerSubmited} 
                                style={styles.button} 
                                onPress={this.showAnswer}>
                                    <Text style={styles.buttonText}>SHOW ANSWER</Text>
                            </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity 
                            disabled={this.state.answerSubmited} 
                            style={styles.button} 
                            onPress={this.resetCode}>
                                <Text style={styles.buttonText}>RESET CODE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            disabled={!this.state.answerSubmited} 
                            style={styles.button} 
                            onPress={this.nextExercise}>
                                <Text style={styles.buttonText}>NEXT EXERCISE</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        onPress={this.exitTutorial}
                        style={styles.exitButton}>
                            <Text style={styles.buttonText}>EXIT TUTORIAL</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <ActivityIndicator size={100} />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    exerciseTitle: {
        margin: 5,
        fontSize: 20,
        width: '100%',
        backgroundColor: '#4a148c',
        color: 'white'
    },
    assignment: {
        margin: 5,
        marginLeft: 5,
        fontSize: 18
    },
    codeContainer: {
        width: '100%',
        height: '30%',
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: '#383d3d'
    },
    input: {
        width: '100%', 
        height: 200, 
        backgroundColor: '#383d3d', 
        color: 'white', 
        justifyContent: 'flex-start', 
        fontSize: 20, 
        paddingLeft: 4
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    button: {
        width: Dimensions.get('window').width * 0.3,
        height: 50,
        backgroundColor: '#4a148c',
        justifyContent: 'center',
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    exitButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#4a148c',
        justifyContent: 'center',
        marginTop: 30
    }
})

Exercise.navigationOptions = (navigationData) => {
    const tutorial = navigationData.navigation.getParam('tutorial');
    const userTutorials = navigationData.navigation.getParam('tutorialsStats')

    if (userTutorials === null) {
        return {
            headerTitle: `1. ${tutorial.lessons[0].name}`, 
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#4a148c',
            },
            headerTintColor: 'white'
        }
    }
    else {
        const tutorialIds = userTutorials.map(tut => tut.uid)
        if (!tutorialIds.includes(tutorial.uid)) {
            return {
                headerTitle: `1. ${tutorial.lessons[0].name}`, 
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#4a148c',
                },
                headerTintColor: 'white'
            }
        }
        else {
            const tutorialState = userTutorials.find(tut => tut.uid === tutorial.uid)
            return {
                headerTitle: `${tutorialState.lessonId + 1}. ${tutorial.lessons[tutorialState.lessonId].name}`, 
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#4a148c',
                },
                headerTintColor: 'white'
            }
        }
    }
    
}

const mapStateToProps = state => {
    return {
        tutorials: state.tutorials.tutorials,
        userData: state.auth.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserData: (uuid, tutorialsData) => dispatch(updateUserData(uuid, tutorialsData)),
        updateTutorials: (tutorialsData) => dispatch(updateTutorials(tutorialsData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);