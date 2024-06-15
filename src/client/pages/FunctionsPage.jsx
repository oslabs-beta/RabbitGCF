import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import FunctionTable from '../components/FunctionTable.jsx';

const FunctionsPage = () => {

  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Functions Page</h1>
        <Typography paragraph>
          Table:
        </Typography>
        <FunctionTable />
      </Box>
    </div>
  );
};

export default FunctionsPage;