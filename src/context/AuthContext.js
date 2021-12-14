import createDataContext from "./createDataContext";
import tracker from '../api/tracker';
import {AsyncStorage} from 'react-native';
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch(action.type){
        case 'signout': 
            return {token: null, errorMessage: ''};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage: '', token: action.payload[0], email: action.payload[1]};
        case 'getAllInfo': 
            return {...state, allInfo: action.payload};
        default:
            return state;
    };
};

const signup = (dispatch) => {
    return async ({email, password}) => {
        try{
            const response = await tracker.post('/signup', { email, password });
            let obj = {  
                token: response.data.token,  
                email: email  
            }
            await AsyncStorage.setItem('token', JSON.stringify(obj));
            dispatch({type: 'signin', payload: [response.data.token, email]});
            navigate('RegisterScreen');
        }catch(err){
            dispatch({type: 'add_error', payload: 'Something went wrong with Signup'});
        }
    };
};

const signin = (dispatch) => {
    return async ({email, password}) => {
        try{
            
            const response = await tracker.post('/signin', {email, password});
            let obj = {  
                token: response.data.token,  
                email: email  
            }
            await AsyncStorage.setItem('token', JSON.stringify(obj));
            dispatch({type: 'signin', payload: [response.data.token, email]});
            navigate('QrScreen');
        }catch(err){
            console.log(err.message);
            dispatch({
                type: 'add_error',
                payload: 'something went wong with sign in'
            })
        }
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'signout'});
        navigate('Home')
    };
};

const setData = (dispatch) => {
    return async ({
        firstName,
        lastName,
        email,
        phone,
        status,
        cycleNum, 
        locationStartTime, 
        locationStartLat, 
        locationStartLong, 
        locationEndTime, 
        locationEndLat, 
        locationEndLong,
        balance}) => {
        try{
            let user = await AsyncStorage.getItem('token');
            let tokenData = await JSON.parse(user);
            let token = tokenData.token;  
            const data = JSON.stringify({
                firstName,
                lastName,
                email, 
                status,
                phone,
                cycleNum,
                locationStartTime, 
                locationStartLat, 
                locationStartLong, 
                locationEndTime, 
                locationEndLat, 
                locationEndLong,
                balance
            })
            const response = await tracker.post('/tracks', data, {
                headers: { 'Authorization': `Bearer ${token}`, 'content-type': 'application/json'},
            });
            dispatch({type: 'signin', payload: [response.data.token, email]});
        }catch(err){
            dispatch({
                type: 'add_error',
                payload: err.message
            })
        }
    };
};

const setDataOnce = (dispatch) => {
    return async ({
        firstName,
        lastName,
        email,
        phone
        }) => {
        try{
            let user = await AsyncStorage.getItem('token');
            let tokenData = await JSON.parse(user);
            let token = tokenData.token;  
            const data = JSON.stringify({
                firstName,
                lastName,
                email, 
                status: 'close',
                phone,
                cycleNum: 1,
                locationStartTime: '1', 
                locationStartLat: 1, 
                locationStartLong: 1, 
                locationEndTime: 1, 
                locationEndLat: 1, 
                locationEndLong: 1,
                balance: 0
            })
            const response = await tracker.post('/tracks', data, {
                headers: { 'Authorization': `Bearer ${token}`, 'content-type': 'application/json'},
            });
            navigate('QrScreen');
            dispatch({type: 'signin', payload: [response.data.token, email]});
        }catch(err){
            dispatch({
                type: 'add_error',
                payload: err.message
            })
        }
    };
};

const getData = (dispatch) => {
    return async () => {
        let user = await AsyncStorage.getItem('token');
        let tokenData = await JSON.parse(user);
        let token = tokenData.token;
        if(token){
            try{
                const data = await tracker.get('/tracks', {
                    headers: { 'Authorization': `Bearer ${token}`, 'content-type': 'application/json'},
                })
                if(data){
                    dispatch({type: 'getAllInfo', payload: data.data});
                }
            }catch (err){
                dispatch({type: 'add_error', payload: 'Something went wrong in fetching the data'});
            }
        }else{
            dispatch({type: 'add_error', payload: 'You are not signed in'});
        }        
    }
}

const updateData = dispatch => {
    return async ({
        id,
        firstName,
        lastName,
        status,
        email, 
        phone,
        locationStartTime, 
        locationStartLat, 
        locationStartLong, 
        locationEndTime, 
        locationEndLat, 
        locationEndLong,
        balance}) => {
        let user = await AsyncStorage.getItem('token');
        let tokenData = await JSON.parse(user);
        let token = tokenData.token;
        console.log(`${email}, ${locationStartTime}, ${locationStartLat}, ${locationStartLong}, ${locationEndTime}, ${locationEndLat}, ${locationEndLong}`);
        if(token){
            const data = JSON.stringify({
                id,
                firstName,
                lastName,
                email,
                status,
                phone,
                locationStartTime, 
                locationStartLat, 
                locationStartLong, 
                locationEndTime, 
                locationEndLat, 
                locationEndLong,
                balance
            })
            try{
                await tracker.post('/updateData', data, {
                    headers: { 'Authorization': `Bearer ${token}`, 'content-type': 'application/json'},
                });
            }catch(err){
                dispatch({type: 'add_error', payload: 'Something went wrong in Update'});
            }
        }else{
            dispatch({type: 'add_error', payload: 'You are not signed in'});
        }        
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup, setData, setDataOnce, getData, updateData},
    {isSignedIn: false, errorMessage: '', token: '', email: '', allInfo: ''}
);