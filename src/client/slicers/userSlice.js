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
      // console.log('login payload ==>', action.payload)
      state.isLoggedIn = true;
      state.authCredentials = action.payload;
    },
    setProfile: (state, action) => {
      // console.log(action.payload);
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