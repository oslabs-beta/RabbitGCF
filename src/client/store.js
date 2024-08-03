import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './slicers/projectsSlice.js';

export default configureStore({
  reducer: {
    projects: projectsSlice,
  },
})