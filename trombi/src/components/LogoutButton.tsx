import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';

import '../../locales/index';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import { getCustomState } from '../utils/CustomFunctions';
import { TouchableOpacity } from 'react-native-gesture-handler';


function LogoutButton() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const disconnect = () => {
    navigation.navigate('Login');
    // TODO: remove user token
  };
  return (
    <View>
      <TouchableOpacity onPress={disconnect} style={styles.button}>
        <Text style={styles.button_text}>{t('settings.logout')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: getCustomState().custom['button-primary'],
    padding: 10,
    borderRadius: 3,
    alignItems: 'center',
  },
  button_text: {
    color: getCustomState().custom['button-primary-foreground'],
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
