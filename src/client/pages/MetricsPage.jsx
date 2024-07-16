import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import GraphComponent from '../components/ZoomGraph.jsx';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MetricsPage = () => {
  const [executionCountData, setExecutionCountData] = useState([]);
  const [executionTimeData, setExecutionTimeData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  
  const [functionName, setFunctionName] = useState('getCharacters');
  
  const [functionList, setFunctionList] = useState([]);

  const [selected, setSelected] = useState(false);

  function handleFunctionSelect(e) {
    setFunctionName(e.target.value);
    console.log(functionName);
    setSelected(true);
  }

  const projectId = 'refined-engine-424416-p7';

  const getFunctionList = async () => {
    try {
      const response = await fetch(`/api/metrics/funcs/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      // console.log('functionList: ', data);
      setFunctionList(data);
    } catch (error) {
      console.log('Error in getFunctionList: ', error);
    }
  }
  
  useEffect(() => {
    getFunctionList();
  }, [])

  let dummySwitch = false;

  // dummy switch for fetch requests
  // if(selected) {
    if(dummySwitch) {
      useEffect(() => {

        fetch('/api/executioncount')
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            };
            return res.json();
          })
          .then(data => setExecutionCountData(data))
          .catch(error => console.error('Error fetching runtime data: ', error));

        fetch('/api/runtime')
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            };
            return res.json();
          })
          .then(data => setExecutionTimeData(data))
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
    } else {
      console.log('real data fetch requests');

      const getExecutionCounts = async () => {
        try {
          console.log('execution count reload')
          const response = await fetch(`/api/metrics/execution_count/${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          delete data['getCharacters'];
          console.log('executionCount data: ', data);
          setExecutionCountData(data);
        } catch (error) {
          console.log('Error in getExecutionCounts: ', error);
        }
      }

      const getExecutionTimes = async () => {
        try {
          const response = await fetch(`/api/metrics/execution_times/${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log('executionTime data: ', data);
          setExecutionTimeData(data);
        } catch (error) {
          console.log('Error in getExecutionTimes: ', error);
        }
      }

      const getMemoryBytes = async () => {
        try {
          const response = await fetch(`/api/metrics/user_memory_bytes/${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log('memory data: ', data);
          setMemoryData(data);
        } catch (error) {
          console.log('Error in getMemoryBytes: ', error);
        }
      }
      
      const getNetworkEgress = async () => {
        try {
          const response = await fetch(`/api/metrics/network_egress/${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log('egress data: ', data)
          setNetworkData(data);
        } catch (error) {
          console.log('Error in getNetworkEgress: ', error);
        }
      }

      useEffect(() => {
        getExecutionCounts();
        getExecutionTimes();
        getMemoryBytes();
        getNetworkEgress();
      }, [])
    }
  // }


  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Metrics Page</h1>

        <div>
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175, display: 'flex'}}>
            <InputLabel id="demo-simple-select-autowidth-label">Function</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={functionName}
              onChange={handleFunctionSelect}
              autoWidth
              label="Function"
            >
              { functionList ?
                functionList.map(el => {
                  return <MenuItem value={el} key={el}>{el}</MenuItem>
                }) : null
              }
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {/* <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <Typography paragraph>
          These are your metrics:
        </Typography>
        {/* <div className='metrics-container'> */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
          <div style={{marginBottom: '20px'}}>
            <Typography style={{display: 'flex', justifyContent: 'center'}}>
              Execution Count:
            </Typography>
            <Box sx={{width: 'full', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            { executionCountData[functionName] ? 
              <GraphComponent
                data={executionCountData[functionName]}
                dataKey="value"
                statusKey="status"
                label="Execution Count"
              /> : <Typography style={{display: 'flex', justifyContent: 'center'}}>Data not available</Typography>       
            }
            </Box>
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography style={{display: 'flex', justifyContent: 'center'}}>
              Execution Time:
            </Typography>
            <Box sx={{width: 'full', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            { executionTimeData[functionName] ?
              <GraphComponent
                data={executionTimeData[functionName]}
                dataKey="value"
                statusKey="status"
                label="Execution Time (ms)"
              /> : <Typography style={{display: 'flex', justifyContent: 'center'}}>Data not available</Typography>
            }         
            </Box>
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography style={{display: 'flex', justifyContent: 'center'}}>
              Memory:
            </Typography>
            <Box sx={{width: 'full', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            { memoryData[functionName] ?
                <GraphComponent
                  data={memoryData[functionName]}
                  dataKey="value"
                  statusKey="status"
                  label="Memory (MB)"
                /> : <Typography style={{display: 'flex', justifyContent: 'center'}}>Data not available</Typography> 
              }  
            </Box>
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography style={{display: 'flex', justifyContent: 'center'}}>
              Network Egress:
            </Typography>
            <Box sx={{width: 'full', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            { networkData[functionName] ?
              <GraphComponent
                data={networkData[functionName]}
                dataKey="value"
                statusKey="status"
                label="Network Egress (MB)"
              /> : <Typography style={{display: 'flex', justifyContent: 'center'}}>Data not available</Typography> 
            }
            </Box>         
          </div>
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
            {/* </Box> */}
        </div>
      </Box>
    </div>
  );
};

export default MetricsPage;