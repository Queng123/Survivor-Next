import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import {WidgetContainer} from '../components/WidgetContainer';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../utils/ThemeContext';
import {getCustomState} from '../utils/CustomFunctions';

const Widgets = () => {
  const navigation = useNavigation();
  const theme = useTheme().theme === 'dark' ? '-dark' : '';

  const customStyles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: getCustomState().custom[`button-primary${theme}`],
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    text: {
      fontSize: 30,
      color: getCustomState().custom[`text-primary${theme}`],
    },
    view: {
      width: '100%',
      height: '100%',
      backgroundColor: getCustomState().custom[`background-1${theme}`],
    },
  });
  return (
    <View style={customStyles.view}>
      <WidgetContainer />
      <Pressable
        style={customStyles.button}
        onPress={() => {
          navigation.navigate('WidgetSelector');
        }}>
        <Text style={customStyles.text}>+</Text>
      </Pressable>
    </View>
  );
};

export default Widgets;

