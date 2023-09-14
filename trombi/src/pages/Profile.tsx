import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import ProfileInfo from '../components/ProfileInfo';
import {getCurrentUserInfos} from '../utils/getCurrentUserInfos';


const Profile: React.FC = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<any>(null);

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}>
        <Ionicon name="settings-outline" size={40} />
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

export default Profile;
