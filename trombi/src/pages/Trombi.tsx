import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {IconButton, Menu, PaperProvider, Text} from 'react-native-paper';
import ProfileCardList from '../components/ProfileCardListComponent';
import {
  EmployeeSortFunction,
  SortEmployeePropSurname,
  SortEmployeePropName,
} from '../utils/SortEmployeeProp';

const Trombi = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortFunction, setSortFunction] = React.useState(
    () => SortEmployeePropSurname,
  );
  const [visible, setVisible] = React.useState(false);

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
          <TextInput
            style={styles.input}
            placeholder="Rechercher"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="sort" onPress={openMenu} />}>
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
  input: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
  },
});

export default Trombi;
