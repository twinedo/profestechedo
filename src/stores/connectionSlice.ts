import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type ConnectionState = {
  isConnected: boolean;
};

const initState: ConnectionState = {
  isConnected: false,
};

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: initState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      return state;
    },
  },
});

export const {setIsConnected} = connectionSlice.actions;

export default connectionSlice.reducer;
