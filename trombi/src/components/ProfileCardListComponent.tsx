import React from 'react';
import {View, ScrollView} from 'react-native';
import ProfileCard from './ProfileCardComponent';
import {BasicEmployeeProps} from './ProfileCardComponent';

type EmployeeSortFunction = (
  a: BasicEmployeeProps,
  b: BasicEmployeeProps,
) => number;

const ProfileCardList = ({
  sortFunction,
  searchQuery,
}: {
  sortFunction: EmployeeSortFunction;
  searchQuery?: string;
}) => {
  const [employees, setEmployees] = React.useState<BasicEmployeeProps[]>([]);
  React.useEffect(() => {
    fetch('https://masurao.fr/api/employees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Group-Authorization': '',
        Authorization: '',
      },
    })
      .then(Response => Response.json())
      .then(json => {
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
      })
      .catch(error => {
        console.error(error);
      });
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
