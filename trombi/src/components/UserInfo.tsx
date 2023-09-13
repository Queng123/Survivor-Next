import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {ScrollView} from 'react-native-gesture-handler';
import {ProfileInfo} from './ProfileInfo';
import {CustomButton} from './CustomButton';
import {getTokens} from '../utils/TokenFunctions';
import {getCustomState} from '../utils/CustomFunctions';

export const getUserInfos = async (id: number) => {
  try {
    const response = await fetch(
      `${getCustomState()['company-api-url']}/employees/${id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-Group-Authorization': getCustomState()['group-token'],
          Authorization: 'Bearer ' + getTokens()['masurao-token'],
        },
      },
    );

    if (!response.ok) {
      console.error(`Request failed with status ${response.status}`);
    }

    const employeeInformations = await response.json();
    return employeeInformations;
  } catch (error) {
    console.error(error);
  }
};

const UserInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInformation = await getUserInfos(id);
        setUserInfo(userInformation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [id]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileInfo
          id={userInfo.id}
          name={userInfo.name}
          post={userInfo.work}
          email={userInfo.email}
          birthday={userInfo.birthday}
          gender={userInfo.gender}
        />
      </View>
      <CustomButton
        title="Chat"
        iconName="chatbubble-outline"
        onPress={() => navigation.navigate('Chat')}
      />
      <CustomButton
        title="Email"
        iconName="mail-outline"
        onPress={() => Linking.openURL('mailto:oliver.lewis@masurao.jp')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
});

export default UserInfo;
