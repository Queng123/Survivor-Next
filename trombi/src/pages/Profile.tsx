import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import ProfileInfo from '../components/ProfileInfo';
import {ScrollView} from 'react-native-gesture-handler';

const Profile: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}>
          <Ionicon name="settings-outline" size={40} />
        </TouchableOpacity>
        <ProfileInfo
          name="Pierre Jean"
          post="CTO"
          email="pierrejean@bizzare.fr"
          birthday="31/12/1999"
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
