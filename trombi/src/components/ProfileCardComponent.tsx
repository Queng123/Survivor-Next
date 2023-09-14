import React, {useState, useEffect} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getTokens} from '../utils/TokenFunctions';
import {getCustomState} from '../utils/CustomFunctions';
import {useNavigation} from '@react-navigation/native';

export type BasicEmployeeProps = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

const getEmployeeJob = async (id: number) => {
  try {
    const response = await fetch(
      `${getCustomState()['company-api-url']}/employees/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Group-Authorization': getCustomState()['group-token'],
          Authorization: 'Bearer ' + getTokens()['masurao-token'],
        },
      },
    );

    if (!response.ok) {
      console.error(`Request failed with status ${response.status}`);
      return null;
    }

    const json = await response.json();
    return json.work;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const ProfileCard = (props: BasicEmployeeProps) => {
  const navigation = useNavigation();
  const photoURL: string = `${getCustomState()['company-api-url']}/employees/${
    props.id
  }/image`;
  const [job, setJob] = useState<string | null>(null);

  useEffect(() => {
    getEmployeeJob(props.id).then(employeeJob => {
      setJob(employeeJob);
    });
  }, [props.id]);

  return (
    <TouchableHighlight
      style={styles.employeeCard}
      onPress={() => {
        navigation.navigate('UserInfo', {id: props.id});
      }}>
      <View style={styles.cardHeader}>
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
        <Text style={styles.employeeCardNameText}>
          {props.name} {props.surname} {job !== null ? `Job: ${job}` : ''}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  employeeCard: {
    backgroundColor: 'grey',
    marginBottom: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  employeeCardImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
  employeeCardNameText: {
    flex: 1,
    fontSize: 25,
    color: 'black',
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
});
