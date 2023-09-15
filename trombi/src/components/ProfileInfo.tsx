import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getTokens} from '../utils/TokenFunctions';
import {getCustomState} from '../utils/CustomFunctions';
import {useTheme} from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ProfileInfoProps {
  id: string;
  name: string;
  post: string;
  email: string;
  birthday: string;
  gender: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  id,
  name,
  post,
  email,
  birthday,
  gender,
}) => {
  const pictureURL: string = `${
    getCustomState()['company-api-url']
  }/employees/${id}/image`;
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const {t} = useTranslation();
  const customStyles = StyleSheet.create({
    name: {
      color: getCustomState().custom[`title-primary${theme}`],
      fontSize: 30,
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    nameContainer: {
      borderBottomWidth: 1,
      borderBottomColor: getCustomState().custom[`title-primary${theme}`],
      paddingBottom: 15,
    },
    infoLabel: {
      color: getCustomState().custom[`title-secondary${theme}`],
      fontSize: 25,
      paddingTop: 20,
    },
    info: {
      color: getCustomState().custom[`text-primary${theme}`],
      fontSize: 20,
    },
  });
  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: pictureURL,
          headers: {
            'Content-Type': 'image/png',
            'X-Group-Authorization': getCustomState()['group-token'],
            Authorization: 'Bearer ' + getTokens()['masurao-token'],
          },
        }}
        style={styles.image}
      />
      <View style={customStyles.nameContainer}>
        <Text style={customStyles.name}>{name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={customStyles.infoLabel}>{t('profile.work')}</Text>
        <Text style={customStyles.info}>{post}</Text>
        <Text style={customStyles.infoLabel}>{t('profile.email')}</Text>
        <Text style={customStyles.info}>{email}</Text>
        <Text style={customStyles.infoLabel}>{t('profile.birthDate')}</Text>
        <Text style={customStyles.info}>{birthday}</Text>
        <Text style={customStyles.infoLabel}>{t('profile.gender')}</Text>
        <Text style={customStyles.info}>{gender}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 30,
    marginTop: 30,
  },
  infoContainer: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileInfo;
