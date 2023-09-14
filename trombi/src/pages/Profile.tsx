import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import ProfileInfo from '../components/ProfileInfo';
import {getTokens} from '../utils/TokenFunctions';
import {useTheme} from '../utils/ThemeContext';
import {getCustomState} from '../utils/CustomFunctions';

export const getCurrentUserInfos = async () => {
  try {
    const response = await fetch(
      `${getCustomState()['company-api-url']}/employees/me`,
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

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const [userInfo, setUserInfo] = useState<any>(null);
  const customStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: getCustomState().custom[`background-1${theme}`],
      justifyContent: 'center',
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInformation = await getCurrentUserInfos();
        setUserInfo(userInformation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  return userInfo ? (
    <View style={customStyles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}>
        <Ionicon
          name="settings-outline"
          size={40}
          style={{
            color: getCustomState().custom[`button-secondary${theme}`],
          }}
        />
      </TouchableOpacity>
      <ProfileInfo
        id={userInfo?.id}
        name={userInfo?.name + ' ' + userInfo?.surname}
        post={userInfo?.work}
        email={userInfo?.email}
        birthday={userInfo?.birth_date}
        gender={userInfo?.gender}
      />
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
  settingsButton: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
});

export default Profile;
