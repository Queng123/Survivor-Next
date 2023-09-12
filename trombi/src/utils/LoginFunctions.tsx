import {Alert} from 'react-native';
import axios from 'axios';

const handleLogin = async (
  email: string,
  password: string,
  navigation: any,
) => {
  try {
    const response = await axios.post('company_api_url/login',
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
  } catch (error) {}
};

export default handleLogin;
