import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GOOGLE_CLIENT_ID } from '@env';
import { OAuthToken } from './TokenTypes';
import { getTokens, setTokens, setTokensInLocalStorage } from './TokenFunctions';


export const loginAndStoreToken = async (): Promise<OAuthToken> => {
    await GoogleSignin.hasPlayServices();
    const userInfo: any = await GoogleSignin.signIn();
    
    setTokens({
        ...getTokens(),
        'google-oauth': userInfo.idToken,
    });
    setTokensInLocalStorage(getTokens());
    return userInfo.idToken;
}
