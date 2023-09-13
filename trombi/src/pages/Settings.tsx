import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import LanguageButton from '../components/LanguageButton';
import ThemeButton from '../components/ThemeButton';
import LogoutButton from '../components/LogoutButton';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {getCustomState} from '../utils/CustomFunctions';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Settings = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.but}>
          <TouchableOpacity onPress={goBack} style={styles.button}>
            <Text style={styles.button_text}>{t('settings.goBack')}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{t('settings.title')}</Text>
      </View>
      <View>
        <View style={styles.language}>
          <Text style={styles.text}>{t('settings.theme')}</Text>
          <View style={styles.themeButton}>
            <ThemeButton />
          </View>
        </View>
        <View style={styles.language}>
          <Text style={styles.text}>{t('settings.language')}</Text>
          <View style={styles.drowdownpicker}>
            <LanguageButton />
          </View>
        </View>
        <View>
          <LogoutButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: getCustomState().custom['title-primary'],
  },
  text: {
    color: getCustomState().custom['text-primary'],
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
  drowdownpicker: {
    width: '50%',
    marginRight: 0,
    marginLeft: 'auto',
    zIndex: 1000,
  },
  language: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    zIndex: 2,
  },
  themeButton: {
    width: '32%',
    marginLeft: 'auto',
  },
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
  but: {
    marginRight: 'auto',
  },
});

export default Settings;
