import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import ProfileInfo from '../components/ProfileInfo';
import {ScrollView} from 'react-native-gesture-handler';

export const getCurrentUserInfos = async () => {
  try {
    const response = await fetch('https://masurao.fr/api/employees/me', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-Group-Authorization': '',
        Authorization: '',
      },
    });

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
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}>
          <Ionicon name="settings-outline" size={40} />
        </TouchableOpacity>
        <ProfileInfo
          id="74"
          name="Oliver Lewis"
          post="Administrative Intern"
          email="oliver.lewis@masurao.jp"
          birthday="2000-08-13"
          gender="Male"
        />
      </View>
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

export default Profile;
