import { createSlice } from '@reduxjs/toolkit'

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projectList: [],
    setProjectId: '',
  },
  reducers: {
    deleteProject: (state, action) => {
      state.projectList.splice(action.payload, 1);
    },
    setProjectList: (state, action) => {
      state.projectList = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveProject, deleteProject, focusProject, setProjectList } = projectsSlice.actions

export default projectsSlice.reducer