import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  founder: {},
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
  userRole: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      if (action.payload.statusCode === 200) {
        state.founder = action.payload.data;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        state.error = action.payload.message || 'Login failed';
        state.founder = {};
      }
    },
    logout: (state) => {
      state.founder = {};
      state.isAuthenticated = false;
      state.token = null;
      state.userRole = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { login, logout } = authSlice.actions;
export default authSlice;
