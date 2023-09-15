import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {IconButton, Menu, PaperProvider, Text} from 'react-native-paper';
import ProfileCardList from '../components/ProfileCardListComponent';
import {
  EmployeeSortFunction,
  SortEmployeePropSurname,
  SortEmployeePropName,
} from '../utils/SortEmployeeProp';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../utils/ThemeContext';
import {getCustomState} from '../utils/CustomFunctions';

const Trombi = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortFunction, setSortFunction] = React.useState(
    () => SortEmployeePropSurname,
  );
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const customStyles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getCustomState().custom[`background-1${theme}`],
      borderRadius: 20,
      flex: 1,
      marginRight: 8,
      borderWidth: 1,
      borderColor: getCustomState().custom[`button-primary-foreground${theme}`],
    },
    searchIcon: {
      padding: 10,
      color: getCustomState().custom[`button-primary${theme}`],
    },
    input: {
      flex: 1,
      height: 40,
      padding: 10,
      color: getCustomState().custom[`text-secondary${theme}`],
      caretColor: getCustomState().custom[`button-primary${theme}`],
    },
  });

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSort = (sortFunction: EmployeeSortFunction) => {
    setSortFunction(() => sortFunction);
    closeMenu();
  };

  return (
    <PaperProvider>
      <View>
        <View style={styles.header}>
          <View style={customStyles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={24}
              color="black"
              style={customStyles.searchIcon}
            />
            <TextInput
              style={customStyles.input}
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon={() => (
                  <Ionicons
                    name="swap-vertical-outline"
                    size={24}
                    color={getCustomState().custom[`button-primary${theme}`]}
                  />
                )}
                onPress={openMenu}
              />
            }>
            <Menu.Item
              onPress={() => handleSort(SortEmployeePropSurname)}
              title={<Text>Sort by surname</Text>}
            />
            <Menu.Item
              onPress={() => handleSort(SortEmployeePropName)}
              title={<Text>Sort by name</Text>}
            />
          </Menu>
        </View>
        <ProfileCardList
          sortFunction={sortFunction}
          searchQuery={searchQuery}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
});

export default Trombi;
