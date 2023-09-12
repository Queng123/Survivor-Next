import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import '../../locales/index';
import { useTranslation } from 'react-i18next';

function LanguageButton(): JSX.Element {
  const {t, i18n} = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('en');
  const [items, setItems] = React.useState([
    {label: 'Francais', value: 'fr'},
    {label: 'English', value: 'en'}
  ]);

  React.useEffect(() => {
    i18n.changeLanguage(value);
  }, [value]);

  return (
    <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default LanguageButton;
