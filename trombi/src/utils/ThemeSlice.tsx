import {createSlice} from '@reduxjs/toolkit';
import type {ThemeData} from './ThemeTypes';

const initialState = {
  theme: {
    'theme': 'light',
  } as ThemeData,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,

  reducers: {
    setThemeState(state, action: {payload: ThemeData; type: string}) {
      state.theme = action.payload;
    },
  },
});

export const {setThemeState} = themeSlice.actions;

export default themeSlice.reducer;
