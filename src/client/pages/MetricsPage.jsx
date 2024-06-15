import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import GraphComponent from '../components/ZoomGraph.jsx';

const MetricsPage = () => {
  const [runtimeData, setRuntimeData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);

  useEffect(() => {
    fetch('/api/runtime')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        };
        return res.json();
      })
      .then(data => setRuntimeData(data))
      .catch(error => console.error('Error fetching runtime data: ', error));

    fetch('/api/memory')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json()
    })
      .then(data => setMemoryData(data))
      .catch(error => console.error('Error fetching memory data: ', error));
  }, []);

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
              Runtime:
            </Typography>
            {/* <Box sx={{bgcolor: '#D4F1F4', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
          <GraphComponent
            data={runtimeData}
            dataKey="runtime"
            statusKey="status"
            label="Runtime (ms)"
          />              <DummyGraph />
            {/* </Box> */}
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography>
              Memory:
            </Typography>
            {/* <Box sx={{bgcolor: '#ffe5eb', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
            <Box sx={{bgcolor: '#ffe5eb', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
          <GraphComponent
            data={memoryData}
            dataKey="memory"
            statusKey="status"
            label="Memory (MB)"
          />              <DummyGraph />
            {/* </Box> */}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default MetricsPage;