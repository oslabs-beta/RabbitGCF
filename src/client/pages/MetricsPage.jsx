import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';

const MetricsPage = () => {

  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Metrics Page</h1>
        <Typography paragraph>
          These are your metrics
        </Typography>
        <Typography paragraph>
          Metric 1:
        </Typography>
        <Box sx={{bgcolor: 'skyblue', width: 300, height: 300}}>

        </Box>

        <Typography paragraph>
          Metric 2:
        </Typography>
        <Box sx={{bgcolor: 'pink', width: 300, height: 300}}>

        </Box>
      </Box>
    </div>
  );
};

export default MetricsPage;