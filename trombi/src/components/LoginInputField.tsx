import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {getCustomState} from '../utils/CustomFunctions';
import {useTheme} from '../utils/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface LoginInputFieldProps {
  label: string;
  icon: React.JSX.Element;
  keyboardType: any;
  secure: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const LoginInputField: React.FC<LoginInputFieldProps> = ({
  label,
  icon,
  keyboardType,
  secure,
  value,
  onChangeText,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const theme = useTheme().theme === 'dark' ? '-dark' : '';

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const customStyles = StyleSheet.create({
    textInput: {
      flex: 1,
      paddingVertical: 0,
      color: getCustomState().custom[`text-secondary${theme}`],
    },
  });
  return (
    <View style={styles.container}>
      {icon}
      <TextInput
        style={customStyles.textInput}
        placeholder={label}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={!isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
      />
      {secure && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    color: '#000',
  },
});

export default LoginInputField;
