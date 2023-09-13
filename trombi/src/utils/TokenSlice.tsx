import {createSlice} from '@reduxjs/toolkit';
import type {TokenData} from './TokenTypes';

const initialState = {
  tokens: {
    'masurao-token': '',
  } as TokenData,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,

  reducers: {
    setTokenState(state, action: {payload: TokenData; type: string}) {
      state.tokens = action.payload;
    },
  },
});

export const {setTokenState} = tokenSlice.actions;

export default tokenSlice.reducer;
