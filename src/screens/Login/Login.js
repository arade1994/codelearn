import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import { fetchUsers, fetchUserData } from '../../store/actions/users'
import { validatePassword } from '../../utils/Validations'
import { loginUser } from '../../store/actions/auth'

import HeadingText from '../../components/UI/HeadingText/HeadingText'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import { apiURL } from '../../utils/Connection'

class LoginScreen extends React.Component {
    state = {
        loginData: {
            username: {
                value: '',
                valid: false,
                touched: false
            },
            password: {
                value: '',
                valid: false,
                touched: false
            }
        }
    }

    static navigationOptions = {
        headerTitle: 'Login',
        headerStyle: {
            backgroundColor: '#4a148c'
        },
        headerTintColor: 'white'
    }

    usernameHandler = (value) => {
        this.setState((prevState) => {
            return {
                loginData: {
                    ...prevState.loginData,
                    username: {
                        ...prevState.username,
                        value: value,
                        valid: value !== '' ? true : false,
                        touched: true
                    }
                }
            }
        })
    }

    passwordHandler = (value) => {
        this.setState((prevState) => {
            return {
                loginData: {
                    ...prevState.loginData,
                    password: {
                        ...prevState.loginData.password,
                        value: value,
                        valid: validatePassword(value),
                        touched: true
                    }
                }
            }
        })
    }

    loginHandler = async () => {
        const loginData = {
            username: this.state.loginData.username.value,
            password: this.state.loginData.password.value
        }

        await this.props.login(loginData)
        
        if (this.props.userData !== null) {
            await AsyncStorage.setItem('@uuid', this.props.userData.uuid);
            if (this.props.userData.tutorials) {
                await AsyncStorage.setItem('@tutorials', JSON.stringify(this.props.userData.tutorials))
            }
            this.props.navigation.replace('Tutorials')
        }
    }

    submitButtonDisabled = () => {
        if (this.state.loginData.username.valid && this.state.loginData.password.valid) {
            return false
        }

        return true
    }

    switchToRegister = () => {
        this.props.navigation.navigate({routeName: 'Register'})
    }

    async componentDidMount() {
        await this.props.fetchAllUsers();
        const userUuid = await AsyncStorage.getItem('@uuid');
        
        if (userUuid !== null) {
            await this.props.fetchUser(userUuid)
            this.props.navigation.replace('Tutorials')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <HeadingText styles={styles.headerText} >Please login</HeadingText>
                    <View>
                        <Input 
                            style={styles.input} 
                            placeholder='USERNAME'
                            onChangeText={this.usernameHandler}
                            value={this.state.loginData.username.value}
                            valid={this.state.loginData.username.valid}
                            touched={this.state.loginData.username.touched} />
                        {!this.state.loginData.username.valid && this.state.loginData.username.touched ? <Text style={styles.inputError}>You must enter username!</Text> : null}
                        <Input 
                            style={styles.input} 
                            placeholder='PASSWORD'
                            secureTextEntry={true}
                            onChangeText={this.passwordHandler}
                            value={this.state.loginData.password.value}
                            valid={this.state.loginData.password.valid}
                            touched={this.state.loginData.password.touched} />
                        {!this.state.loginData.password.valid && this.state.loginData.password.touched ? <Text style={styles.inputError}>Incorrect password(between 6 and 16 characters)!</Text> : null}
                        <Button 
                            color='#4a148c' 
                            disabled={this.submitButtonDisabled()}
                            onPress={this.loginHandler}>LOGIN</Button>
                    </View>
                    <Button 
                        color='#4a148c'
                        onPress={this.switchToRegister}>SWITCH TO REGISTER</Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    headerText: {
        textAlign: 'center'
    },
    input: {
        marginBottom: 10
    },
    inputError: {
        color: 'red',
        textAlign: 'right'
    }
})

const mapStateToProps = state => {
    return {
        userData: state.auth.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(fetchUsers()),
        fetchUser: (uuid) => dispatch(fetchUserData(uuid)),
        login: (loginData) => dispatch(loginUser(loginData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);