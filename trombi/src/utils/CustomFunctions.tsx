import { store } from './GlobalStore';
import { CustomData } from './CustomTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADMIN_API_URL, COMPANY_UUID } from "@env"

export const fetchCustomDataFromLocalStorage = async (): Promise<CustomData> => {
    const promise = new Promise<CustomData>((resolve, reject) => {
        AsyncStorage.getItem('customData').then(value => {
        if (value === null) {
            reject('No custom data found in local storage');
        } else {
            const customData = JSON.parse(value);
            resolve(customData);
        }
        });
    });
    return promise;
}

export const setCustomDataInLocalStorage = async (customData: CustomData) => {
    AsyncStorage.setItem('customData', JSON.stringify(customData));
}

export const fetchLatestUpdateFromApi = async (): Promise<string> => {
    const promise = new Promise<string>((resolve, reject) => {
        const url = `${ADMIN_API_URL}/company/update/${COMPANY_UUID}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
    return promise;
}

export const setLatestUpdateInLocalStorage = async (latestUpdate: string) => {
    AsyncStorage.setItem('customLatestUpdate', latestUpdate);
}

export const fetchLatestUpdateFromLocalStorage = async (): Promise<string> => {
    const promise = new Promise<string>((resolve, _) => {
        AsyncStorage.getItem('customLatestUpdate').then(value => {
        if (value === null) {
            resolve('');
        } else {
            resolve(value);
        }
        });
    });
    return promise;
}

export const fetchCustomDataFromApi = async (): Promise<CustomData> => {
    const promise = new Promise<CustomData>((resolve, reject) => {
        const url = `${ADMIN_API_URL}/company/custom/${COMPANY_UUID}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
    return promise;
}

export const setCustomState = (customData: CustomData) => {
    store.dispatch({type: 'custom/setCustomState', payload: customData});
}

export const getCustomState = (): CustomData => {
    return store.getState().custom.customState;
}

export const appInitCustomData = async () => {
    const fetchCatch = (error1: Error | string) => {
        console.debug("API Fetch reason", error1);
        fetchCustomDataFromApi().then(customData => {
            setCustomState(customData);
            setCustomDataInLocalStorage(customData);
        }).catch(error => {
            console.error("Current error", error);
        });
    }

    fetchCustomDataFromLocalStorage().then(customData => {
        setCustomState(customData);
        fetchLatestUpdateFromLocalStorage().then(latestUpdate => {
            console.debug("Fetch from local storage latest update", latestUpdate);
            fetchLatestUpdateFromApi().then(latestUpdateApi => {
                if (latestUpdate !== latestUpdateApi) {
                    fetchCatch("latestUpdate !== latestUpdateApi");
                }
                setLatestUpdateInLocalStorage(latestUpdateApi);
            }).catch(error2 => {
                console.error("Fail to fetch latest update from api", error2);
            });
        })
    }).catch(error1 => {
        fetchCatch(error1);
    });
}
