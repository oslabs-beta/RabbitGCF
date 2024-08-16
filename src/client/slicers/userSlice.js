import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    authCredentials: null,
    profile: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.authCredentials = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.authCredentials = null;
      state.profile = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, setProfile, logout } = userSlice.actions

export default userSlice.reducer