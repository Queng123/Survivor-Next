import React from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import '../../locales/index';
import {useTranslation} from 'react-i18next';
import {getCustomState} from '../utils/CustomFunctions';

function LanguageButton(): JSX.Element {
  const {i18n} = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(i18n.language);
  const [items, setItems] = React.useState([
    {label: 'Francais', value: 'fr'},
    {label: 'English', value: 'en'},
  ]);

  React.useEffect(() => {
    i18n.changeLanguage(value);
  }, [value, i18n]);

  const styles = {
    style: {
      backgroundColor: getCustomState()?.custom?.['background-2'],
    },
    dropDownContainerStyle: {
      backgroundColor: getCustomState()?.custom?.['background-2'],
    },
    selectedItemContainerStyle: {
      backgroundColor: getCustomState()?.custom?.['background-3'],
    },
    textStyle: {
      color: getCustomState()?.custom?.['text-primary'],
    },
  };

  return (
    <View>
      <DropDownPicker
        style={styles.style}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        selectedItemContainerStyle={styles.selectedItemContainerStyle}
        textStyle={styles.textStyle}
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

export default LanguageButton;
