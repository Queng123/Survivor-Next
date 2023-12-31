import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import {getCustomState} from '../utils/CustomFunctions';
import {useTheme} from '../utils/ThemeContext';

interface CustomButtonProps {
  title: string;
  iconName: string;
  onPress: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  title,
  iconName,
  onPress,
}) => {
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const customStyles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getCustomState().custom[`background-3${theme}`],
      borderRadius: 10,
      padding: 0,
      margin: 3,
      width: 180,
    },
    icon: {
      color: getCustomState().custom[`text-primary${theme}`],
    },
    title: {
      color: getCustomState().custom[`text-primary${theme}`],
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
      marginRight: 100,
      width: 150,
    },
  });
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={customStyles.buttonContainer}>
        <View style={Styles.iconContainer}>
          <Ionicon name={iconName} size={20} style={customStyles.icon} />
        </View>
        <Text style={customStyles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 10,
    padding: 10,
    marginRight: 1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
