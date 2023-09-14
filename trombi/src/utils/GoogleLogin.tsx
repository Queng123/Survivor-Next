import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { OAuthToken } from './TokenTypes';
import { getTokens, setTokens, setTokensInLocalStorage } from './TokenFunctions';
import { Alert, Button } from 'react-native';

export const loginAndStoreToken = async (): Promise<OAuthToken> => {
  console.log("starting loginAndStoreToken");
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