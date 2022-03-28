import React from 'react'
import { StyleSheet, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { fetchTutorials } from '../../store/actions/tutorials'
import MenuButton from '../../components/UI/MenuButton/MenuButton'

class Tutorials extends React.Component {
    async componentDidMount() {
        await this.props.getAllTutorials()
    }   

    showTutorialDetails = (tutorialData) => {
        this.props.navigation.navigate('TutorialDetails', {
            tutorialData: tutorialData
        })
    }

    render() {
        return (
            <View style={styles.tutorialsContainer}>
                {this.props.tutorials !== null ? (
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        style={styles.tutorialsList}
                        data={this.props.tutorials}
                        renderItem={(tutorial) => {
                            const tutorialData = tutorial.item
                            return (
                                <View key={tutorial.index} style={styles.tutorial}>
                                    <TouchableOpacity onPress={() => this.showTutorialDetails(tutorialData)}>
                                        <Image 
                                            style={styles.coverImage} 
                                            source={{ uri: tutorialData.coverImage }} />
                                    </TouchableOpacity>
                                </View>
                        )}} />    
                ) : (
                    <ActivityIndicator size={100} />
                )}      
            </View>
        )
    }
}

Tutorials.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Tutorials',
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
    tutorialsContainer: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'flex-start'
    },
    tutorialsList: {
    },
    tutorial: {
        margin: 3,
        flex: 1,
        borderWidth: 1,
        borderColor: '#4a148c'
    },
    coverImage: {
        height: 120
    }
})

const mapStateToProps = (state) => {
    return {
        tutorials: state.tutorials.tutorials
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllTutorials: () => dispatch(fetchTutorials())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorials);