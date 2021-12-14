import React, {useState, useContext} from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const textColor = 'rgb(233, 216, 206)';

const RegisterScreen = (props) => {
    const {state, setDataOnce} = useContext(AuthContext);
    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");
    const [email, onChangeEmail] = useState("");
    const [phone, onChangePhone] = useState(0);

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
                onChangeText={onChangeFirstName}
                value={firstName}
                placeholder="First Name"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeLastName}
                value={lastName}
                placeholder="Last Name"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="email"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangePhone}
                value={phone}
                placeholder="Phone Number"
            />
            <TouchableOpacity style = {{justifyContent: 'center', alignItems: 'center'}} 
                onPress={() => setDataOnce({firstName, lastName, email, phone})}>
                <View style = {styles.button}>
                    <Text style = {{fontSize: 25}}>Continue</Text>
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

RegisterScreen.navigationOptions = () => {
    return{
        headerShown: false
    };
}

export default RegisterScreen;