import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {OAuthToken} from './TokenTypes';
import {getTokens, setTokens, setTokensInLocalStorage} from './TokenFunctions';

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
