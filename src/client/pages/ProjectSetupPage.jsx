import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from '../components/NavBar.jsx';
import DrawerHeader from "../components/DrawerHeader.jsx";
import { Box, Typography, Button, FormControl, TextField } from '@mui/material/';
import CircularProgress from '@mui/material/CircularProgress';
import { saveProject } from "../slicers/projectsSlice.js";
import { useDispatch, useSelector } from "react-redux";

const ProjectSetupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const user = useSelector( state => state.user.profile );

  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [serviceAccKey, setServiceAccKey] = useState();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (location.state) {
      setProjectName(location.state.project.project_name);
      setProjectId(location.state.project.project_id);
      setServiceAccKey(location.state.project.key);
    } else {
      setProjectName(`e.g., My Project ${99999 - Math.floor(Math.random()*99999)}`);
      setProjectId(`e.g., refined-engine-${99999 - Math.floor(Math.random()*99999)}-e8`);
      setServiceAccKey("Replace text here with JSON object access key");
    }
  }, [])

  const back = (e) => {
    navigate("/projects");
  }
  
  /** 
   * Will need to refactor save to save project to database instead of state.
   * Refactoring should also encrypt serviceAccKey prior to saving to database
   */
  const save = (e) => {
    setIsSaving(true);

    /** Check if project is a new add or existing project */
    const index = (location.state) ? location.state.projectListIndex : null;
    if (index === null) {
      console.log('adding new project')
      fetch('/api/project/add', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            profile_id: user.id,
            project_id: projectId,
            project_name: projectName,
            key: serviceAccKey
        })
      }).then(res => {
          setIsSaving(false);
          navigate("/projects");
        }).catch(err => console.log(err));
    } else {
      console.log('updating existing project')
      fetch('/api/project/update', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            id: location.state.project.id,
            profile_id: user.id,
            project_id: projectId,
            project_name: projectName,
            key: serviceAccKey
          }
        )
      }).then(() => {
        console.log('existing project updated')
          setIsSaving(false);
          navigate("/projects");
        }).catch(err => console.log(err));
    }
  }

  return (
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Setup Project</h1>
        <Box sx={{width: 700}}>
          <Typography paragraph>
            { projectId && projectName && serviceAccKey &&
            <FormControl>
              <TextField
                sx={{ m: 1, width: 700, bgcolor: '#FFFFFF'}}
                required
                id="projectNameField"
                label="Project name"
                defaultValue={projectName}
                onChange={e => setProjectName(e.target.value)}
              />
              <TextField
                sx={{ m: 1, width: 700, bgcolor: '#FFFFFF'}}
                required
                id="projectIdField"
                label="Project ID"
                defaultValue={projectId}
                onChange={e => setProjectId(e.target.value)}
              />
              <TextField
                sx={{ m: 1, width: 700, bgcolor: '#FFFFFF'}}
                required
                id="serviceAccKeyField"
                label="Service account JSON access key"
                multiline
                rows={20}
                defaultValue={serviceAccKey}
                onChange={e => setServiceAccKey(e.target.value)}
              />
            </FormControl>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Box margin={1}>
                <Button variant='outlined' onClick={back}>Back</Button>
              </Box>
              <Box margin={1}>
                <Button variant='contained' onClick={save}>Save</Button>
              </Box>
            </Box>
          </Typography>
        </Box>
      </Box>
      { isSaving && 
        <Box sx={{ display: 'flex' }}>
          <CircularProgress/>
        </Box>}
    </div>
  );
}

export default ProjectSetupPage;