import React from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import '../../locales/index';
import {useTranslation} from 'react-i18next';
import {getCustomState} from '../utils/CustomFunctions';
import {setLanguageInLocalStorage} from '../utils/LanguageFunctions';
import {useTheme} from '../utils/ThemeContext';

function LanguageButton(): JSX.Element {
  const {i18n} = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(i18n.language);
  const [items, setItems] = React.useState([
    {label: 'Francais', value: 'fr'},
    {label: 'English', value: 'en'},
  ]);

  React.useEffect(() => {
    setLanguageInLocalStorage({language: value});
    i18n.changeLanguage(value);
  }, [value, i18n]);

  const theme = useTheme().theme === 'dark' ? '-dark' : '';

  const styles = {
    style: {
      backgroundColor: getCustomState()?.custom?.[`button-primary${theme}`],
    },
    dropDownContainerStyle: {
      backgroundColor: getCustomState()?.custom?.[`button-primary${theme}`],
    },
    selectedItemContainerStyle: {
      backgroundColor: getCustomState()?.custom?.[`button-secondary${theme}`],
    },
    textStyle: {
      color: getCustomState()?.custom?.[`button-primary-foreground${theme}`],
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
