import { createSlice } from '@reduxjs/toolkit'

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projectList: [],
    projectFocusIndex: null,
    setProjectId: '',
  },
  reducers: {
    saveProject: (state, action) => {
      state.projectList.push(action.payload);
    },
    deleteProject: (state, action) => {
      state.projectList.splice(action.payload, 1);
    },
    focusProject: (state, action) => {
      state.projectFocusIndex = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveProject, deleteProject, focusProject } = projectsSlice.actions

export default projectsSlice.reducer