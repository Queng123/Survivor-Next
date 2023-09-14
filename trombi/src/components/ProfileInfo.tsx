import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getTokens} from '../utils/TokenFunctions';
import {getCustomState} from '../utils/CustomFunctions';
import {useTheme} from '../utils/ThemeContext';

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
  const {theme} = useTheme();
  const pictureURL: string = `${
    getCustomState()['company-api-url']
  }/employees/${id}/image`;
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
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text>{theme}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Poste</Text>
        <Text style={styles.info}>{post}</Text>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.info}>{email}</Text>
        <Text style={styles.infoLabel}>Anniversaire</Text>
        <Text style={styles.info}>{birthday}</Text>
        <Text style={styles.infoLabel}>Genre</Text>
        <Text style={styles.info}>{gender}</Text>
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
  nameContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 15,
  },
  name: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  infoContainer: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    color: 'black',
    fontSize: 25,
    paddingTop: 20,
  },
  info: {
    color: 'black',
    fontSize: 20,
  },
});

export default ProfileInfo;
