import { createSlice } from '@reduxjs/toolkit'

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projectList: [],
    setProjectId: '',
  },
  reducers: {
    saveProject: (state, action) => {
      console.log(action.payload);
      const { project, index } = action.payload;
      if(index) state.projectList[index] = project;
      else state.projectList.push(project);
    },
    deleteProject: (state, action) => {
      state.projectList.splice(action.payload, 1);
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveProject, deleteProject, focusProject } = projectsSlice.actions

export default projectsSlice.reducer