import {Alert} from 'react-native';
import axios from 'axios';

const handleLogin = async (
  email: string,
  password: string,
  navigation: any,
) => {
  try {
    const response = await axios.post(
      'company_api_url/login',
      {
        email,
        password,
      },
      {
        headers: {
          accept: 'application/json',
          'X-Group-Authorization': 'temp',
        },
        validateStatus: function () {
          return true;
        },
      },
    );
    handleLoginResponse(response, navigation);
  } catch (error) {
    handleLoginError(error);
  }
};

const handleLoginResponse = (response: any, navigation: any) => {
  if (response.status === 200) {
    navigation.navigate('Home');
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
