import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileInfo from '../components/ProfileInfo';

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <ProfileInfo
        name="Pierre Jean"
        post="CTO"
        email="pierrejean@bizzare.fr"
        birthday="31/12/1999"
        gender="Male"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
