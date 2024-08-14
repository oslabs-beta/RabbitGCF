import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './slicers/projectsSlice.js';
import userSlice from './slicers/userSlice.js';

export default configureStore({
  reducer: {
    projects: projectsSlice,
    user: userSlice,
  },
})