import React, { useEffect, useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import useDetail from '../hooks/useDetail';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

const textColor = 'rgb(233, 216, 206)';

const paymentScreen = props => {
    const {signout} = useContext(AuthContext);
    return(
        <>
        <View style = {{backgroundColor: textColor, flexDirection: 'row', padding: 40}}>
            <View style = {{flex: 1}} />
            <View>
                <TouchableOpacity onPress = {() => {
                    signout();
                    props.navigation.navigate('Signin');
                    }}>
                    <MaterialIcons name="logout" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        <View style = {{...styles.background, flex: 1, justifyContent: 'center'}}>
            
                <>
                    <View style = {{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assets/mainLogo.png')}
                        />
                    </View>
                    <View style = {styles.heading}>
                        <Text style = {{fontSize: 35, textAlign: 'center'}}> Payment Due </Text>
                        <Text style = {{fontSize: 35, textAlign: 'center'}}> ₹ 10 </Text>
                    </View>            
                    <View style = {{...styles.button, justifyContent: 'center'}}>
                        <View style = {{backgroundColor: "rgb(223, 190, 102)", borderRadius: 10, width: '50%', height: 50}}>
                            <TouchableOpacity onPress={ ()=> Linking.openURL('https://rzp.io/i/XQEC7Hw')}>
                                <Text style = {{fontSize: 35, textAlign: 'center'}}>Pay Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{height: 20}}/>
                        <View style = {{backgroundColor: "rgb(223, 190, 102)", borderRadius: 10, width: '50%', height: 50}}>
                            <TouchableOpacity onPress={ ()=> props.navigation.navigate('Signin')}>
                                <Text style = {{fontSize: 35, textAlign: 'center'}}>Pay Later</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>                
            </View>       
            </>
    )
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center'
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        textAlign: 'center', 
        justifyContent: 'center'
    },
    tinyLogo: {
        justifyContent: 'center',
        width: 250,
        height: 145,
    }
  });

paymentScreen.navigationOptions = () => {
    return{
        headerShown: false
    };
}

export default paymentScreen;