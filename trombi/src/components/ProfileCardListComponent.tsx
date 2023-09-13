import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
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

  useEffect(() => {
    const fetchData = async () => {
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

        const json = await response.json();

        let filteredEmployees = [...json];
        if (searchQuery) {
          filteredEmployees = filteredEmployees.filter(employee => {
            const lowerName = employee.name.toLowerCase();
            const lowerSurname = employee.surname.toLowerCase();
            const lowerSearchQuery = searchQuery.toLowerCase();
            return (
              lowerName.includes(lowerSearchQuery) ||
              lowerSurname.includes(lowerSearchQuery)
            );
          });
        }
        const sortedEmployees = filteredEmployees.sort(sortFunction);
        setEmployees(sortedEmployees);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [sortFunction, searchQuery]);

  return (
    <ScrollView>
      <View>
        {employees.map(employee => (
          <ProfileCard
            key={employee.id}
            id={employee.id}
            name={employee.name}
            surname={employee.surname}
            email={employee.email}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileCardList;
