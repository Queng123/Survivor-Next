import {BasicEmployeeProps} from '../components/ProfileCardComponent';

export type EmployeeSortFunction = (
  a: BasicEmployeeProps,
  b: BasicEmployeeProps,
) => number;

export const SortEmployeePropSurname: EmployeeSortFunction = (
  a: BasicEmployeeProps,
  b: BasicEmployeeProps,
) => {
  const lowerA = a.surname.toLowerCase();
  const lowerB = b.surname.toLowerCase();

  return lowerA.localeCompare(lowerB);
};

export const SortEmployeePropName: EmployeeSortFunction = (
  a: BasicEmployeeProps,
  b: BasicEmployeeProps,
) => {
  const lowerA = a.name.toLowerCase();
  const lowerB = b.name.toLowerCase();

  return lowerA.localeCompare(lowerB);
};
