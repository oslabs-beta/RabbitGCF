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
          These are your metrics
        </Typography>
        <Typography paragraph>
          Runtime:
        </Typography>
        {/* <Box sx={{bgcolor: 'skyblue', width: 300, height: 300}}> */}
          <GraphComponent
            data={runtimeData}
            dataKey="runtime"
            statusKey="status"
            label="Runtime (ms)"
          />
        {/* </Box> */}

        <Typography paragraph>
          Memory:
        </Typography>
        {/* <Box sx={{bgcolor: 'pink', width: 300, height: 300}}> */}
          <GraphComponent
            data={memoryData}
            dataKey="memory"
            statusKey="status"
            label="Memory (MB)"
          />
        {/* </Box> */}
      </Box>
    </div>
  );
};

export default MetricsPage;