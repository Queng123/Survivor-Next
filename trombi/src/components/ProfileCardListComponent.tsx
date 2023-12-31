import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import ProfileCard from './ProfileCardComponent';
import {BasicEmployeeProps} from './ProfileCardComponent';
import {EmployeeSortFunction} from '../utils/SortEmployeeProp';
import {getTokens} from '../utils/TokenFunctions';
import {getCustomState} from '../utils/CustomFunctions';

const ProfileCardList = ({
  sortFunction,
  searchQuery,
}: {
  sortFunction: EmployeeSortFunction;
  searchQuery?: string;
}) => {
  const [employees, setEmployees] = useState<BasicEmployeeProps[]>([]);
  const [sortedEmployees, setSortedEmployees] = useState<BasicEmployeeProps[]>(
    [],
  );

  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const response = await fetch(
          `${getCustomState()['company-api-url']}/employees`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Group-Authorization': getCustomState()['group-token'],
              Authorization: 'Bearer ' + getTokens()['masurao-token'],
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedEmployees = await response.json();
        setEmployees(fetchedEmployees);
      } catch (error) {
        console.error(error);
      }
    };
    if (employees.length === 0) {
      fetchEmployeesData();
    }
  }, [employees]);
  useEffect(() => {
    let filteredEmployees: BasicEmployeeProps[] = employees;

    if (searchQuery) {
      filteredEmployees = employees.filter(employee => {
        const lowerCaseName = employee.name.toLowerCase();
        const lowerCaseSurname = employee.surname.toLowerCase();
        return (
          lowerCaseName.includes(searchQuery.toLowerCase()) ||
          lowerCaseSurname.includes(searchQuery.toLowerCase())
        );
      });
    }
    const sorted = [...filteredEmployees].sort(sortFunction);
    setSortedEmployees(sorted);
  }, [employees, searchQuery, sortFunction]);

  return (
    <FlatList
      data={sortedEmployees}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ProfileCard
          key={item.id}
          id={item.id}
          name={item.name}
          surname={item.surname}
          email={item.email}
        />
      )}
      ListFooterComponent={<View style={{height: 70}} />}
    />
  );
};

export default ProfileCardList;
