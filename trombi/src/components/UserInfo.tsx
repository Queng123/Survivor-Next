import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Linking, ActivityIndicator} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import ProfileInfo from './ProfileInfo';
import {CustomButton} from './CustomButton';
import {getTokens} from '../utils/TokenFunctions';
import {getCustomState} from '../utils/CustomFunctions';
import {useTheme} from '../utils/ThemeContext';

import {ADMIN_API_URL} from '@env';
import {getCurrentUserInfos} from '../utils/getCurrentUserInfos';
import {useTranslation} from 'react-i18next';

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
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const customStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: getCustomState().custom[`background-1${theme}`],
      justifyContent: 'center',
    },
  });
  const [chatUserId, setChatUserId] = useState<any>(null);
  const {t} = useTranslation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInformation = await getUserInfos(id);
        setUserInfo(userInformation);
        const localUser = await getCurrentUserInfos();

        if (localUser) {
          const myChatUserId = `${localUser.name}-${localUser.surname}`;
          setChatUserId(myChatUserId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [id]);

  return userInfo ? (
    <View style={customStyles.container}>
      <View>
        <ProfileInfo
          id={id}
          name={userInfo?.name + ' ' + userInfo?.surname}
          post={userInfo?.work}
          email={userInfo?.email}
          birthday={userInfo?.birth_date}
          gender={userInfo?.gender}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title={t('userInfo.chat')}
          iconName="chatbubble-outline"
          onPress={async () => {
            const user2 = `${userInfo?.name + '-' + userInfo?.surname}`;
            const url = `${ADMIN_API_URL}/chat/channel/${chatUserId}/${user2}`;
            await fetch(url);
            navigation.navigate('ChannelListScreen');
          }}
        />
        <CustomButton
          title={t('userInfo.email')}
          iconName="mail-outline"
          onPress={() => Linking.openURL(`mailto:${userInfo.email}`)}
        />
      </View>
    </View>
  ) : (
    <View style={customStyles.container}>
      <ActivityIndicator
        size="large"
        color={getCustomState().custom[`button-primary${theme}`]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
});

export default UserInfo;
