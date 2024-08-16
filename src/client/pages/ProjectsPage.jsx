import React from 'react';
import NavBar from '../components/NavBar.jsx';
import DrawerHeader from '../components/DrawerHeader.jsx';
import ProjectsTable from '../components/ProjectsTable.jsx';
import { Box, Typography, Button } from '@mui/material/';
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();

  const addProject = (e) => {
    console.log('add project clicked');
    navigate("/projects/setup");
  }

  return (
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Projects Page</h1>
        <Button variant="contained" onClick={addProject} sx={{m: '0px 0px 20px 0px'}}>Add Project</Button>
        <ProjectsTable />
      </Box>
    </div>
  );
}

export default ProjectsPage;