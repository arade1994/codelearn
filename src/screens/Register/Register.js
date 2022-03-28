import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { validateEmail, validatePassword } from '../../utils/Validations'
import { registrateUser } from '../../store/actions/auth'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

class RegisterScreen extends React.Component {
    state = {
        userData: {
            firstName: {
                value: '',
                valid: false,
                touched: false
            },
            lastName: {
                value: '',
                valid: false,
                touched: false
            },
            age: {
                value: '',
                valid: false,
                touched: false
            },
            username: {
                value: '',
                valid: false,
                touched: false,
                taken: false
            },
            city: {
                value: '',
                valid: false,
                touched: false
            },
            country: {
                value: '',
                valid: false,
                touched: false
            },
            email: {
                value: '',
                valid: false,
                touched: false
            },
            password: {
                value: '',
                valid: false,
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                touched: false
            }
        },
        loading: false
    }

    static navigationOptions = {
        headerTitle: 'Register',
        headerStyle: {
            backgroundColor: '#4a148c'
        },
        headerTintColor: 'white'
    }

    commonHandler = (value, input) => {
        this.setState((prevState) => {
            return {
                userData: {
                    ...prevState.userData,
                    [input]: {
                        ...prevState.userData[input],
                        value: value,
                        valid: value !== '' ? true : false,
                        touched: true
                    }
                }
            }
        })
    } 

    usernameHandler = (value) => {
        const userNamesList = this.props.usersList.map(user => {
            return user.username
        })
        const usernameIsValid = !userNamesList.includes(value)

        this.setState((prevState) => {
            return {
                userData: {
                    ...prevState.userData,
                    username: {
                        ...prevState.userData.username,
                        value: value,
                        valid: usernameIsValid,
                        touched: true,
                        taken: !usernameIsValid
                    }
                }
            }
        })
    }

    emailHandler = (value) => {
        this.setState((prevState) => {
            return {
                userData: {
                    ...prevState.userData,
                    email: {
                        ...prevState.userData.email,
                        value: value,
                        valid: validateEmail(value),
                        touched: true
                    }
                }
            }
        })
    }

    passwordHandler = (value) => {
        this.setState((prevState) => {
            return {
                userData: {
                    ...prevState.userData,
                    password: {
                        ...prevState.userData.password,
                        value: value,
                        valid: validatePassword(value),
                        touched: true
                    }
                }
            }
        })
    }

    confirmPasswordHandler = (value) => {
        this.setState((prevState) => {
            return {
                userData: {
                    ...prevState.userData,
                    confirmPassword: {
                        ...prevState.userData.confirmPassword,
                        value: value,
                        valid: value === prevState.userData.password.value,
                        touched: true
                    }
                }
            }
        })
    }

    submitButtonDisabled = () => {
        if (this.state.userData.firstName.valid && 
            this.state.userData.lastName.valid && 
            this.state.userData.age.valid && 
            this.state.userData.username.valid &&
            !this.state.userData.username.taken &&
            this.state.userData.city.valid &&
            this.state.userData.country.valid &&
            this.state.userData.email.valid &&
            this.state.userData.password.valid &&
            this.state.userData.confirmPassword.valid) {
                return false
            }
        
        return true;
    }

    submitHandler = async () =>{
        await this.setState({ loading: true })
        await this.props.registrate(this.state.userData)
        await this.setState({ loading: false })
        alert('Welcome! You are now one of us');
        this.props.navigation.replace('Login')
    }

    render() {
        let submit = (
            <Button
                color='#4a148c'
                disabled={this.submitButtonDisabled()}
                onPress={this.submitHandler} >
                    SUBMIT
            </Button>
        )
        if (this.state.loading) {
            submit = <ActivityIndicator color='black' />
        }
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.headingText}>Please enter requiring data to join our community!</Text>
                <View style={styles.inputsContainer}>
                    <Input
                        placeholder='FIRST NAME'
                        onChangeText={(value) => this.commonHandler(value, 'firstName')}
                        value={this.state.userData.firstName.value}
                        valid={this.state.userData.firstName.valid}
                        touched={this.state.userData.firstName.touched} />
                    {!this.state.userData.firstName.valid && this.state.userData.firstName.touched ? <Text style={styles.inputError}>You must enter first name!</Text> : null}
                    <Input
                        placeholder='LAST NAME'
                        onChangeText={(value) => this.commonHandler(value, 'lastName')}
                        value={this.state.userData.lastName.value}
                        valid={this.state.userData.lastName.valid}
                        touched={this.state.userData.lastName.touched} />
                    {!this.state.userData.lastName.valid && this.state.userData.lastName.touched ? <Text style={styles.inputError}>You must enter last name!</Text> : null}
                    <Input
                        placeholder='AGE'
                        keyboardType='numeric'
                        onChangeText={(value) => this.commonHandler(value, 'age')}
                        value={this.state.userData.age.value}
                        valid={this.state.userData.age.valid}
                        touched={this.state.userData.age.touched} />
                    {!this.state.userData.age.valid && this.state.userData.age.touched ? <Text style={styles.inputError}>You must enter age!</Text> : null}
                    <Input
                        placeholder='UNIQUE USERNAME'
                        onChangeText={this.usernameHandler}
                        value={this.state.userData.username.value}
                        valid={this.state.userData.username.valid}
                        touched={this.state.userData.username.touched} />
                    {!this.state.userData.username.valid && this.state.userData.username.touched ? <Text style={styles.inputError}>{this.state.userData.username.taken ? 'This username is taken' : 'You must enter username!'}</Text> : null}
                    <Input 
                        placeholder='CITY'
                        onChangeText={(value) => this.commonHandler(value, 'city')}
                        value={this.state.userData.city.value}
                        valid={this.state.userData.city.valid}
                        touched={this.state.userData.city.touched} />
                    {!this.state.userData.city.valid && this.state.userData.city.touched ? <Text style={styles.inputError}>You must enter city!</Text> : null}
                    <Input
                        placeholder='COUNTRY'
                        onChangeText={(value) => this.commonHandler(value, 'country')}
                        value={this.state.userData.country.value}
                        valid={this.state.userData.country.valid}
                        touched={this.state.userData.country.touched} />
                    {!this.state.userData.country.valid && this.state.userData.country.touched ? <Text style={styles.inputError}>You must enter country!</Text> : null}
                    <Input
                        placeholder='EMAIL'
                        onChangeText={this.emailHandler}
                        value={this.state.userData.email.value}
                        valid={this.state.userData.email.valid}
                        touched={this.state.userData.email.touched} />
                    {!this.state.userData.email.valid && this.state.userData.email.touched ? <Text style={styles.inputError}>You must enter valid email!</Text> : null}
                    <Input
                        placeholder='PASSWORD'
                        secureTextEntry={true}
                        onChangeText={this.passwordHandler}
                        value={this.state.userData.password.value}
                        valid={this.state.userData.password.valid}
                        touched={this.state.userData.password.touched} />
                    {!this.state.userData.password.valid && this.state.userData.password.touched ? <Text style={styles.inputError}>Incorrect password(between 6 and 16 characters)!</Text> : null}
                    <Input
                        placeholder='CONFIRM PASSWORD'
                        secureTextEntry={true}
                        onChangeText={this.confirmPasswordHandler}
                        value={this.state.userData.confirmPassword.value}
                        valid={this.state.userData.confirmPassword.valid}
                        touched={this.state.userData.confirmPassword.touched} />
                    {!this.state.userData.confirmPassword.valid && this.state.userData.confirmPassword.touched ? <Text style={styles.inputError}>Incorrect password match!</Text> : null}
                </View>
                {submit}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    headingText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputsContainer: {
        margin: 10
    },
    inputError: {
        color: 'red',
        textAlign: 'right'
    }
})

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
        usersList: state.users.usersList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registrate: (userData) => dispatch(registrateUser(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)