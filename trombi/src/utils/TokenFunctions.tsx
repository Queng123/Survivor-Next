import {store} from './GlobalStore';
import {TokenData} from './TokenTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTokensFromLocalStorage = async (): Promise<TokenData> => {
    const promise = new Promise<TokenData>((resolve, reject) => {
        AsyncStorage.getItem('tokens').then(value => {
        if (value === null) {
            reject('No tokens found in local storage');
        } else {
            const tokens = JSON.parse(value);
            resolve(tokens);
        }
        });
    });
    return promise;
    };

export const setTokensInLocalStorage = async (tokens: TokenData) => {
    AsyncStorage.setItem('tokens', JSON.stringify(tokens));
};

export const setTokens = (tokens: TokenData) => {
    store.dispatch({type: 'token/setTokenState', payload: tokens});
}

export const getTokens = (): TokenData => {
    const state = store.getState();
    return state.token.tokens;
}
