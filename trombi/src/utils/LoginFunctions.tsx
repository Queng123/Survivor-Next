import {Alert} from 'react-native';
import {getCustomState} from './CustomFunctions';
import { getTokens, setTokens, setTokensInLocalStorage } from './TokenFunctions';
const handleLogin = async (
  email: string,
  password: string,
  navigation: any,
) => {
  try {
    const url = `${getCustomState()['company-api-url']}/employees/login`;
    const body = {
      email,
      password,
    };
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'X-Group-Authorization': getCustomState()['group-token'],
    };
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    handleLoginResponse(response, navigation);
  } catch (error) {
    handleLoginError(error);
  }
};

const handleLoginResponse = (response: any, navigation: any) => {
  if (response.status === 200) {
    response.json().then((data: any) => {
      setTokens({...getTokens(), 'masurao-token': data['access_token']});
      setTokensInLocalStorage(getTokens());
      navigation.navigate('NavBar');
    });
  } else if (response.status === 401) {
    Alert.alert(
      'Mauvais identifiant',
      "Vérifiez votre email et votre mot de passe s'il vous plaît.",
    );
  } else if (response.status === 422) {
    Alert.alert(
      'Erreur de validation',
      "Vérifiez votre email et votre mot de passe s'il vous plaît.",
    );
  } else {
    Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
  }
};

const handleLoginError = (error: any) => {
  console.log(error);
  Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
};

export default handleLogin;
