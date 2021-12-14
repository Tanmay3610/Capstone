import React, { useEffect, useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import useDetail from '../hooks/useDetail'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const textColor = 'rgb(233, 216, 206)';

const Scanned = props => {
    const {state, updateData, signout} = useContext(AuthContext);
    let data = '';
    const [detailsResult, fetchDetailsResult] = useDetail();
    const [lock, toggleLock] = useState("open");
    const [dataFetched, toggleDataFetched] = useState(false);
    useEffect(() => {
        fetchDetailsResult(state.token, toggleDataFetched, toggleLock);
    },[])
        

    var today = new Date();
    const rotateMotor = command => {
        if(command !== 'close'){
            updateData({
                id: detailsResult[0]._id,
                email: detailsResult[0].email,
                phone: detailsResult[0].phone,
                status: 'open',
                cycleNum: detailsResult[0].cycleNum,
                locationStartTime: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`, 
                locationStartLat: 1, 
                locationStartLong: 1, 
                locationEndTime: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`, 
                locationEndLat: 1, 
                locationEndLong: 1,
                balance: detailsResult[0].balance
            });
            
        }else if(command === 'close'){
            updateData({
                id: detailsResult[0]._id,
                status: 'close',
                email: detailsResult[0].email, 
                locationStartTime: detailsResult[0].locationStartTime, 
                locationStartLat: detailsResult[0].locationStartLat, 
                locationStartLong: detailsResult[0].locationStartLong,
                locationEndTime: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`, 
                locationEndLat: 2, 
                locationEndLong: 2,
                balance: detailsResult[0].balance + 10
            });
        }
    }

    return(
        <>        
        <View style = {{backgroundColor: textColor, flexDirection: 'row', padding: 40}}>
            <View style = {{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{...styles.tinyLogo, marginTop: 150}}
                    source={require('../../assets/mainLogo.png')}
                />
            </View>
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
            
            {dataFetched === true && (
                <View style = {styles.container}>
                   <Text style = {{fontSize: 35}}>Hello, {detailsResult[0].firstName}</Text>
                   <Text style = {{fontSize: 35}}>Cycle 1</Text>
                    {lock === 'close' && (
                        <TouchableOpacity onPress = {() => {
                            rotateMotor('open');
                            toggleLock("open");
                        }}>
                            <View style = {styles.button}>
                                <AntDesign name="unlock" size={50} color="black" />
                            </View>                            
                        </TouchableOpacity>
                    )}
                    
                    {lock === 'open' && (
                        <TouchableOpacity onPress = {() => {
                            rotateMotor('close');
                            props.navigation.navigate('paymentScreen');
                        }}>
                            <View style = {styles.button}>
                                <AntDesign name="lock" size={50} color="black" />
                            </View>                            
                        </TouchableOpacity>
                    )}
                    <Text>{data}</Text>
                    {state.errorMessage ? <Text style = {styles.errorMessage}>{state.errorMessage}</Text> : null}
                </View>
            )}            
        </View> 
        </>       
    )
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 75,
        height: 150,
        width: 150,
        backgroundColor: "rgb(223, 190, 102)",
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        textAlign: 'center',
        fontSize: 35,
        color: textColor
    },
    tinyLogo: {
        justifyContent: 'center',
        width: 250,
        height: 145,
    }
  });

Scanned.navigationOptions = () => {
    return{
        headerShown: false
    };
}

export default Scanned;