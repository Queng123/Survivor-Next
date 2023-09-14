import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { OAuthToken } from './TokenTypes';
import { getTokens, setTokens, setTokensInLocalStorage } from './TokenFunctions';
import { Alert, Button } from 'react-native';

export const loginAndStoreToken = async (): Promise<OAuthToken> => {
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signIn();
  const tokens: any = await GoogleSignin.getTokens();

  setTokens({
    ...getTokens(),
    'google-oauth': tokens.accessToken,
  });
  setTokensInLocalStorage(getTokens());
  return tokens.accessToken;
};

export const findEmailFromBearer = async (token: any) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result.email;
  } catch (error) {
      console.log("token present but error from google api", error);
      return "";
  }
}

export const CustomGoogleLoginButton = (): JSX.Element => {
  const signIn = async () => {
    try {
      await loginAndStoreToken()
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services are not available');
      } else {
        Alert.alert('Something went wrong', error.toString());
        console.error(error);
      }
    }
  };
  return (<Button
    onPress={signIn}
    title="Se connecter avec Google"
  />)
};

export const CustomGoogleLogoutButton = (): JSX.Element => {
  const signOut = async () => {
    try {
      setTokens({
        ...getTokens(),
        'google-oauth': '',
      });
      setTokensInLocalStorage(getTokens());
    } catch (error) {
      console.error(error);
    }
  };
  return (<Button
    onPress={signOut}
    title="Se déconnecter de Google"
  />)
}
