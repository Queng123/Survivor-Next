import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginInputField from '../components/LoginInputField';
import handleLogin from '../utils/LoginFunctions';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
    <View style={styles.container}>
      <LoginInputField
        label={'Email'}
        icon={
          <Ionicons name="mail-outline" size={20} style={styles.enveloppe} />
        }
        keyboardType="email-address"
        secure={false}
        value={email}
        onChangeText={handleEmailChange}
      />
      <LoginInputField
        label={'Mot de passe'}
        icon={
          <Ionicons name="lock-closed-outline" size={20} style={styles.lock} />
        }
        keyboardType="default"
        secure={true}
        value={password}
        onChangeText={handlePasswordChange}
      />
      <TouchableOpacity
        onPress={() => handleLogin(email, password, navigation)}
        style={
          isButtonDisabled ? styles.disabledLoginButton : styles.loginButton
        }
        disabled={isButtonDisabled}>
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 60,
  },
  description: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputField: {
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#9F0000',
    borderRadius: 10,
    padding: 10,
  },
  disabledLoginButton: {
    backgroundColor: '#9F0000',
    borderRadius: 10,
    padding: 10,
    opacity: 0.5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
