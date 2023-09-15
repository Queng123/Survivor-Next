import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getTokens} from '../utils/TokenFunctions';
import {getCustomState} from '../utils/CustomFunctions';
import {useTheme} from '../utils/ThemeContext';
import {useNavigation} from '@react-navigation/native';

export type BasicEmployeeProps = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

const ProfileCard = (props: BasicEmployeeProps) => {
  const navigation = useNavigation();
  const photoURL: string = `${getCustomState()['company-api-url']}/employees/${
    props.id
  }/image`;
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const customStyles = StyleSheet.create({
    employeeCard: {
      backgroundColor: getCustomState().custom[`background-2${theme}`],
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    employeeCardNameText: {
      flex: 1,
      fontSize: 25,
      color: getCustomState().custom[`text-primary${theme}`],
      justifyContent: 'center',
    },
  });
  return (
    <TouchableHighlight
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('UserInfo', { id: props.id });
      }}>
      <View style={customStyles.employeeCard}>
        <FastImage
          source={{
            uri: photoURL,
            headers: {
              'Content-Type': 'image/png',
              'X-Group-Authorization': getCustomState()['group-token'],
              Authorization: 'Bearer ' + getTokens()['masurao-token'],
            },
          }}
          style={styles.employeeCardImage}
        />
        <Text style={customStyles.employeeCardNameText}>
          {props.name} {props.surname}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  employeeCardImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
});
