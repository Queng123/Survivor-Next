import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import {WidgetContainer} from '../components/WidgetContainer';
import {useNavigation} from '@react-navigation/native';

const Widgets = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <WidgetContainer />
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('WidgetSelector');
        }}>
        <Text style={styles.text}>+</Text>
      </Pressable>
    </View>
  );
};

export default Widgets;

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});
