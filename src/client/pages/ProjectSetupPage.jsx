import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar.jsx';
import DrawerHeader from "../components/DrawerHeader.jsx";
import { Box, Typography, Button, FormControl, TextField } from '@mui/material/';
import { saveProject } from "../slicers/projectsSlice.js";
import { useDispatch } from "react-redux";

const ProjectSetupPage = ({ projectList, setProjectList, selectedProject }) => {
  // console.log('selectedProject ==>',selectedProject);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [serviceAccKey, setServiceAccKey] = useState();

  const back = (e) => {
    console.log('add project clicked');
    navigate("/projects");
  }
  
  /** 
   * Will need to refactor save to save project to database instead of state.
   * Refactoring should also encrypt serviceAccKey prior to saving to database
   */
  const save = (e) => {
    // console.log('save project clicked')
    // const newProjectList = projectList.slice();
    // setProjectList(newProjectList);
    (() => {
      dispatch(saveProject({
        projectId,
        projectName,
        serviceAccKey
      }))
    })();
    navigate("/projects");
  }

  const fieldValues = (selectedProject === null) ? 
    {
      projectName: `e.g., My Project ${99999 - Math.floor(Math.random()*99999)}`,
      projectId: `e.g., refined-engine-${99999 - Math.floor(Math.random()*99999)}-e8`,
      serviceAccKey: "Paste JSON object key here"
    } : {
      projectName: projectList[selectedProject].projectName,
      projectId: projectList[selectedProject].projectId,
      serviceAccKey: projectList[selectedProject].serviceAccKey,
    }

  // console.log('fieldValues ==> ',fieldValues);

  return (
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Projects Setup Page</h1>
        <Box sx={{width: 700}}>
          <Typography paragraph>
            <FormControl>
              <TextField
                sx={{ m: 1, width: 700, bgcolor: '#FFFFFF'}}
                required
                id="projectNameField"
                label="Project name"
                defaultValue={fieldValues.projectName}
                onChange={e => setProjectName(e.target.value)}
              />
              <TextField
                sx={{ m: 1, width: 700, bgcolor: '#FFFFFF'}}
                required
                id="projectIdField"
                label="Project ID"
                defaultValue={fieldValues.projectId}
                onChange={e => setProjectId(e.target.value)}
              />
              <TextField
                sx={{ m: 1, width: 700, bgcolor: '#FFFFFF'}}
                required
                id="serviceAccKeyField"
                label="Service account JSON access key"
                multiline
                rows={20}
                defaultValue={fieldValues.serviceAccKey}
                onChange={e => setServiceAccKey(e.target.value)}
              />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Box margin={1}>
                <Button variant='outlined' onClick={back}>Back</Button>
              </Box>
              <Box margin={1}>
                <Button variant='contained' onClick={() => dispatch(save)}>Save</Button>
              </Box>
            </Box>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default ProjectSetupPage;