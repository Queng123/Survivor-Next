import {getTokens} from './TokenFunctions';
import {getCustomState} from './CustomFunctions';

export const getCurrentUserInfos = async () => {
  try {
    const response = await fetch(
      `${getCustomState()['company-api-url']}/employees/me`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-Group-Authorization': getCustomState()['group-token'],
          Authorization: 'Bearer ' + getTokens()['masurao-token'],
        },
      },
    );

    if (!response.ok) {
      console.error(`Request failed with status ${response.status}`);
    }

    const employeeInformations = await response.json();
    return employeeInformations;
  } catch (error) {
    console.error(error);
  }
};
