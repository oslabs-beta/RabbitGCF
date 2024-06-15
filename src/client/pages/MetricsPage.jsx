import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import DummyGraph from '../components/DummyGraph.jsx';
import ZoomGraph from '../components/ZoomGraph.jsx';

const MetricsPage = () => {

  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Metrics Page</h1>
        <Typography paragraph>
          These are your metrics:
        </Typography>
        {/* <div className='metrics-container'> */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
          <div style={{marginBottom: '40px'}}>
            <Typography>
              Metric 1:
            </Typography>
            <Box sx={{bgcolor: '#D4F1F4', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <DummyGraph />
            </Box>
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography>
              Metric 2:
            </Typography>
            <Box sx={{bgcolor: '#ffe5eb', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <ZoomGraph />
            </Box>
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography>
              Metric 3:
            </Typography>
            <Box sx={{bgcolor: '#D4F1F4', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <DummyGraph />
            </Box>
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography>
              Metric 4:
            </Typography>
            <Box sx={{bgcolor: '#ffe5eb', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <DummyGraph />
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default MetricsPage;