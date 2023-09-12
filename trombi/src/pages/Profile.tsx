import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import ProfileInfo from '../components/ProfileInfo';
import { CustomButton } from '../components/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'react-native';

const Profile: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicon name="settings-outline" size={40} />
        </TouchableOpacity>
        <ProfileInfo
          name="Pierre Jean"
          post="CTO"
          email="pierrejean@bizzare.fr"
          birthday="31/12/1999"
          gender="Male"
        />
        {/* <View style={styles.buttonsContainer}>
        <CustomButton
            title="Chat"
            iconName='chatbubble-outline'
            onPress={() => navigation.navigate('PrivateChat')}
          />
          <CustomButton
            title="Email"
            iconName='mail-outline'
            onPress={() => Linking.openURL('mailto:support@example.com') }
          />
        </View> */}
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
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Profile;
