import {createSlice} from '@reduxjs/toolkit';
import type {CustomData} from './CustomTypes';

const initialState = {
  customState: {
    'company-uuid': '',
    'group-token': '',
    'company-api-url': '',
    'extern-api-token': {
      weather: '',
      stock: '',
      gpt3: '',
    },
    custom: {
      'background-1': '',
      'background-1-dark': '',
      'background-2': '',
      'background-2-dark': '',
      'background-3': '',
      'background-3-dark': '',
      'background-4': '',
      'background-4-dark': '',
      'button-primary': '',
      'button-primary-dark': '',
      'button-secondary': '',
      'button-secondary-dark': '',
      'button-primary-foreground': '',
      'button-primary-foreground-dark': '',
      'button-secondary-foreground': '',
      'button-secondary-foreground-dark': '',
      'title-primary': '',
      'title-primary-dark': '',
      'title-secondary': '',
      'title-secondary-dark': '',
      'text-primary': '',
      'text-primary-dark': '',
      'text-secondary': '',
      'text-secondary-dark': '',
      'default-language': '',
    },
  } as CustomData,
};

export const customSlice = createSlice({
  name: 'custom',
  initialState,

  reducers: {
    setCustomState(state, action: {payload: CustomData; type: string}) {
      state.customState = action.payload;
    },
  },
});

export const {setCustomState} = customSlice.actions;

export default customSlice.reducer;
