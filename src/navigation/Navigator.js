import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'

import RegisterScreen from '../screens/Register/Register'
import LoginScreen from '../screens/Login/Login'
import TutorialsScreen from '../screens/Tutorials/Tutorials'
import TutorialDetailsScreen from '../screens/TutorialDetails/TutorialDetails'
import ProfileScreen from '../screens/Profile/Profile'
import LogoutScreen from '../screens/Logout/Logout'
import ExerciseScreen from '../screens/Exercise/Exercise'

const Navigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Tutorials: TutorialsScreen,
    TutorialDetails: TutorialDetailsScreen,
    Exercise: ExerciseScreen
})

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen
})

const LogoutNavigator = createStackNavigator({
    Logout: LogoutScreen
})

const MainNavigator = createDrawerNavigator({
    Navigator: {
        screen: Navigator,
        navigationOptions: {
            drawerLabel: 'Home'
        }
    },
    Profile: ProfileNavigator,
    Logout: LogoutNavigator
}, {
    drawerPosition: 'right',
    drawerBackgroundColor: '#b3d9ff',
    contentOptions: {
        activeTintColor: 'white',
        activeBackgroundColor: '#4a148c',
        labelStyle: {
            fontFamily: 'open-sans',
            fontSize: 20,
            fontWeight: 'bold'
        }
    }
})

export default createAppContainer(MainNavigator);