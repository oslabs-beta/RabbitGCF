import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';

const ForcastPage = () => {

  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Forcast Page</h1>
        <Typography paragraph>
          This is your forcast
        </Typography>
        <Box sx={{bgcolor: 'skyblue', width: 800, height: 400}}>

        </Box>
      </Box>
    </div>
  );
};

export default ForcastPage;