import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import '../../locales/index';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';

function LogoutButton() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const disconnect = () => {
    navigation.navigate('Login');
    // TODO: remove user token
  };

  return (
    <View style={styles.container}>
      <Button title={t('settings.logout')} onPress={deconnexion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default LogoutButton;
