import React, {useState, useContext} from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const textColor = 'rgb(233, 216, 206)';

const Signup = (props) => {
    const {state, signup} = useContext(AuthContext);
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");

    return(
        <View style = {{...styles.background, flex: 1, justifyContent: 'center'}}>
            <View style = {{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/mainLogo.png')}
                />
            </View>
            <View style = {styles.container}>
                <Text style = {styles.heading}>
                    CRS
                </Text>
            </View>
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Login"
            />
            <TextInput
                secureTextEntry = {true}
                style={styles.textInput}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <TouchableOpacity style = {{justifyContent: 'center', alignItems: 'center'}} onPress={() => signup({email, password})}>
                <View style = {styles.button}>
                    <Text style = {{fontSize: 25}}>Signup</Text>
                </View>
            </TouchableOpacity>
            {state.errorMessage ? <Text style = {styles.errorMessage}>{state.errorMessage}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        width: '92%',
        height: 40,
        backgroundColor: "rgb(223, 190, 102)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput : {
        margin: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgb(3, 184, 234)',
        height: 30,
        paddingHorizontal: 10
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: textColor
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    heading: {
        textAlign: 'center',
        fontSize: 35
    },
    tinyLogo: {
        justifyContent: 'center',
        width: 250,
        height: 145,
    }
});
  
Signup.navigationOptions = () => {
    return{
        headerShown: false
    };
}

export default Signup;