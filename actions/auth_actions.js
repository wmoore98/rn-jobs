import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        // Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        // Start up FB Login process
        doFacebookLogin(dispatch);
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    }
};

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('470389633494509', {
        permissions: ['public_profile']
    });
    
console.log(type, token);
    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
    
    await AsyncStorage.setItem('fb_token', token);
    return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
