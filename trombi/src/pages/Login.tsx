import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginInputField from '../components/LoginInputField';
import handleLogin from '../utils/LoginFunctions';
import {useTheme} from '../utils/ThemeContext';
import {getCustomState} from '../utils/CustomFunctions';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Login = () => {
  const navigation = useNavigation();
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const customStyles = StyleSheet.create({
    loginButton: {
      backgroundColor: getCustomState().custom[`button-primary${theme}`],
      borderRadius: 10,
      padding: 10,
    },
    disabledLoginButton: {
      backgroundColor: getCustomState().custom[`button-primary${theme}`],
      borderRadius: 10,
      padding: 10,
      opacity: 0.5,
    },
    loginButtonText: {
      color: getCustomState().custom[`text-primary${theme}`],
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 25,
      paddingTop: 20,
      backgroundColor: getCustomState().custom[`background-1${theme}`],
    },
  });

  useEffect(() => {
    setTimeout(() => {
      const backgroudExists = getCustomState().custom['background-1'];
      if (backgroudExists) {
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  const updateButtonState = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail.toLowerCase());
    updateButtonState();
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    updateButtonState();
  };

  return (
    <KeyboardAvoidingView style={customStyles.container}>
      {!isLoading ? (
        <View style={customStyles.container}>
          <LoginInputField
            label={'Email'}
            icon={
              <Ionicons
                name="mail-outline"
                size={20}
                style={styles.enveloppe}
              />
            }
            keyboardType="email-address"
            secure={false}
            value={email}
            onChangeText={handleEmailChange}
          />
          <LoginInputField
            label={'Mot de passe'}
            icon={
              <Ionicons
                name="lock-closed-outline"
                size={20}
                style={styles.lock}
              />
            }
            keyboardType="default"
            secure={true}
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity
            onPress={() => handleLogin(email, password, navigation)}
            style={
              isButtonDisabled
                ? customStyles.disabledLoginButton
                : customStyles.loginButton
            }
            disabled={isButtonDisabled}>
            <Text style={customStyles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color="black"
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    marginBottom: 10,
  },
  enveloppe: {
    marginRight: 5,
  },
  lock: {
    marginRight: 10,
    marginLeft: 2.5,
  },
});

export default Login;
