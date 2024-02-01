import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  access_token: string;
  token_type: 'bearer' | string;
  expires_in: number;
};

const initState: AuthState = {
  access_token: '',
  token_type: 'bearer',
  expires_in: 9999,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
      return state;
    },
    resetAuth: state => {
      state = initState;
      return state;
    },
  },
});

export const {setAuth, resetAuth} = authSlice.actions;

export default authSlice.reducer;
