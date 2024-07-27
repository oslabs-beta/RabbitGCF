import React from 'react';
import NavBar from '../components/NavBar.jsx';
import DrawerHeader from '../components/DrawerHeader.jsx';
import ProjectsTable from '../components/ProjectsTable.jsx';
import { Box, Typography, Button } from '@mui/material/';
import { useNavigate } from "react-router-dom";

const ProjectsPage = (props) => {
  const navigate = useNavigate();

  const addProject = (e) => {
    console.log('add project clicked');
    props.setSelectedProject(null);
    navigate("/projects/setup");
  }

  return (
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Projects Page</h1>
        <Typography paragraph>
          <Button variant="contained" onClick={addProject}>Add Project</Button>
        </Typography>
        <ProjectsTable projectList={props.projectList} setProjectList={props.setProjectList} selectedProject={props.selectedProject} setSelectedProject={props.setSelectedProject}/>
      </Box>
    </div>
  );
}

export default ProjectsPage;